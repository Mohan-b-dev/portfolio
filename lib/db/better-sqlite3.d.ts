declare module "better-sqlite3" {
  class Database {
    constructor(filename: string, options?: unknown);
    prepare(sql: string): Statement;
    exec(sql: string): this;
    pragma(pragma: string): unknown;
    close(): void;
  }

  interface Statement {
    run(...params: unknown[]): RunResult;
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
  }

  interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  export = Database;
}
