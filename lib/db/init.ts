import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "data", "portfolio.db");

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database | null = null;

export function getDatabase(): Database {
  if (!db) {
    db = new Database(dbPath);
    // Enable foreign keys
    db.pragma("journal_mode = WAL");
    initializeTables();
  }
  return db;
}

function initializeTables() {
  if (!db) return;

  // Create portfolio data table
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL UNIQUE,
      data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TRIGGER IF NOT EXISTS update_portfolio_data_timestamp
    AFTER UPDATE ON portfolio_data
    FOR EACH ROW
    BEGIN
      UPDATE portfolio_data SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
}

export function savePortfolioData(section: string, data: unknown): void {
  const db = getDatabase();
  const dataJson = JSON.stringify(data);

  const stmt = db.prepare(`
    INSERT INTO portfolio_data (section, data) VALUES (?, ?)
    ON CONFLICT(section) DO UPDATE SET data = excluded.data
  `);

  stmt.run(section, dataJson);
}

export function getPortfolioData(section: string): unknown {
  const db = getDatabase();

  const stmt = db.prepare("SELECT data FROM portfolio_data WHERE section = ?");
  const result = stmt.get(section) as { data: string } | undefined;

  if (result) {
    return JSON.parse(result.data);
  }
  return null;
}

export function getAllPortfolioData(): Record<string, unknown> {
  const db = getDatabase();

  const stmt = db.prepare("SELECT section, data FROM portfolio_data");
  const results = stmt.all() as Array<{ section: string; data: string }>;

  const data: Record<string, unknown> = {};
  results.forEach((row) => {
    data[row.section] = JSON.parse(row.data);
  });

  return data;
}

export function deletePortfolioData(section: string): void {
  const db = getDatabase();

  const stmt = db.prepare("DELETE FROM portfolio_data WHERE section = ?");
  stmt.run(section);
}
