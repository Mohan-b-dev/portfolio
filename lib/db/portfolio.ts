import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDirectory = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const dbPath = path.join(dataDirectory, "portfolio.db");

/**
 * Get or create database connection
 * Simple singleton pattern for database access
 */
export function getDb(): Database {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  return db;
}

/**
 * Initialize database tables on first run
 */
export function initDb(): void {
  const db = getDb();

  // Create portfolio_data table
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL UNIQUE,
      data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.close();
}

/**
 * Save data for a portfolio section
 */
export function saveData(section: string, data: unknown): boolean {
  try {
    const db = getDb();
    const dataJson = JSON.stringify(data);

    const stmt = db.prepare(`
      INSERT INTO portfolio_data (section, data) VALUES (?, ?)
      ON CONFLICT(section) DO UPDATE SET 
        data = excluded.data,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(section, dataJson);
    db.close();
    return true;
  } catch (error) {
    console.error(`Error saving data for section ${section}:`, error);
    return false;
  }
}

/**
 * Get data for a specific section
 */
export function getData(section: string): unknown {
  try {
    const db = getDb();
    const stmt = db.prepare(
      "SELECT data FROM portfolio_data WHERE section = ?"
    );
    const result = stmt.get(section) as { data: string } | undefined;
    db.close();

    if (result) {
      return JSON.parse(result.data);
    }
    return null;
  } catch (error) {
    console.error(`Error getting data for section ${section}:`, error);
    return null;
  }
}

/**
 * Get all portfolio data
 */
export function getAllData(): Record<string, unknown> {
  try {
    const db = getDb();
    const stmt = db.prepare("SELECT section, data FROM portfolio_data");
    const results = stmt.all() as Array<{ section: string; data: string }>;
    db.close();

    const data: Record<string, unknown> = {};
    results.forEach((row) => {
      data[row.section] = JSON.parse(row.data);
    });

    return data;
  } catch (error) {
    console.error("Error getting all data:", error);
    return {};
  }
}

/**
 * Delete data for a section
 */
export function deleteData(section: string): boolean {
  try {
    const db = getDb();
    const stmt = db.prepare("DELETE FROM portfolio_data WHERE section = ?");
    stmt.run(section);
    db.close();
    return true;
  } catch (error) {
    console.error(`Error deleting data for section ${section}:`, error);
    return false;
  }
}

// Ensure the table exists as soon as the module is loaded
initDb();
