import { Collection, MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB ?? "portfolio";
const collectionName = "sections";

const DEFAULT_CACHE_TTL = 5_000;

let cachedClient: MongoClient | null = null;
let clientConnected = false;
let cachedCollection: Promise<Collection> | null = null;
let indexesEnsured = false;

type CacheEntry = {
  data: unknown;
  expiresAt: number;
};

const sectionCache = new Map<string, CacheEntry>();

async function getClient(): Promise<MongoClient> {
  if (cachedClient && clientConnected) {
    return cachedClient;
  }

  const options: MongoClientOptions = {
    appName: "portfolio-admin",
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
  };

  try {
    const client = new MongoClient(uri, options);
    console.log(`[Mongo] Connecting to ${uri}...`);
    await client.connect();
    console.log("[Mongo] Connected successfully");
    cachedClient = client;
    clientConnected = true;
    return client;
  } catch (error) {
    console.error("[Mongo] Connection failed:", error);
    clientConnected = false;
    throw new Error(`MongoDB connection failed: ${error}`);
  }
}

async function ensureIndexes(collection: Collection) {
  if (indexesEnsured) {
    return;
  }

  try {
    console.log("[Mongo] Creating indexes...");
    await collection.createIndex(
      { section: 1 },
      { unique: true, background: true }
    );
    console.log("[Mongo] Indexes created successfully");
    indexesEnsured = true;
  } catch (error) {
    console.error("[Mongo] Index creation error:", error);
  }
}

async function getCollection(): Promise<Collection> {
  if (!cachedCollection) {
    cachedCollection = (async () => {
      try {
        const client = await getClient();
        const collection = client.db(dbName).collection(collectionName);
        await ensureIndexes(collection);
        console.log(`[Mongo] Collection ready: ${dbName}.${collectionName}`);
        return collection;
      } catch (error) {
        console.error("[Mongo] Collection setup error:", error);
        cachedCollection = null;
        throw error;
      }
    })();
  }

  return cachedCollection;
}

function cacheSection(
  section: string,
  data: unknown,
  ttlMs: number = DEFAULT_CACHE_TTL
) {
  sectionCache.set(section, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

function getCachedSection(section: string) {
  const cached = sectionCache.get(section);
  if (!cached) {
    return null;
  }

  if (cached.expiresAt < Date.now()) {
    sectionCache.delete(section);
    return null;
  }

  return cached.data;
}

export function clearSectionCache(section?: string) {
  if (section) {
    sectionCache.delete(section);
  } else {
    sectionCache.clear();
  }
}

export type ReadSectionOptions = {
  cacheTTL?: number;
  forceRefresh?: boolean;
  useCache?: boolean;
};

export async function readSection<T = unknown>(
  section: string,
  options: ReadSectionOptions = {}
): Promise<T | null> {
  const { forceRefresh = false, useCache = true } = options;

  if (useCache && !forceRefresh) {
    const cached = getCachedSection(section);
    if (cached) {
      console.log(`[Mongo] Cache hit for section: ${section}`);
      return cached as T;
    }
  }

  try {
    console.log(`[Mongo] Reading section from DB: ${section}`);
    const collection = await getCollection();
    const document = await collection.findOne({ section });

    if (document?.data !== undefined) {
      cacheSection(
        section,
        document.data,
        options.cacheTTL ?? DEFAULT_CACHE_TTL
      );
      console.log(`[Mongo] Section read successfully: ${section}`);
      return document.data as T;
    }

    console.log(`[Mongo] No data found for section: ${section}`);
    return null;
  } catch (error) {
    console.error(`[Mongo] Error reading section "${section}":`, error);
    return null;
  }
}

export interface UpsertSectionOptions {
  cacheTTL?: number;
}

export async function upsertSection(
  section: string,
  data: unknown,
  options: UpsertSectionOptions = {}
): Promise<boolean> {
  try {
    console.log(`[Mongo] Upserting section: ${section}`);
    const collection = await getCollection();
    const result = await collection.updateOne(
      { section },
      { $set: { data }, $currentDate: { updatedAt: true } },
      { upsert: true }
    );

    cacheSection(section, data, options.cacheTTL ?? DEFAULT_CACHE_TTL);
    console.log(
      `[Mongo] Section upserted successfully: ${section} (matched: ${result.matchedCount}, upserted: ${result.upsertedId})`
    );
    return true;
  } catch (error) {
    console.error(`[Mongo] Error upserting section "${section}":`, error);
    return false;
  }
}

export async function readOrCreateSection<T>(
  section: string,
  fallback: T,
  options: ReadSectionOptions = {}
): Promise<T> {
  const data = await readSection<T>(section, options);

  if (data !== null) {
    return data;
  }

  await upsertSection(section, fallback, {
    cacheTTL: options.cacheTTL,
  });

  return fallback;
}
