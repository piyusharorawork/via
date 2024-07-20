import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { File, FileInput, filesTable } from "./schema.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { eq } from "drizzle-orm";

export class FileStore {
  private db: BetterSQLite3Database<Record<string, never>>;
  constructor(databaseName: string) {
    const sqlite = new Database(databaseName);
    this.db = drizzle(sqlite);

    // TODO cross package paths
    const migrationsFolder = path.join(
      path.resolve(),
      "..",
      "..",
      "packages",
      "store",
      "migrations"
    );

    // TODO rather than running migrations everytime , better to migrate once
    migrate(this.db, { migrationsFolder });
  }

  async list(): Promise<File[]> {
    const files = await this.db.select().from(filesTable);
    return files;
  }

  async insert(input: FileInput): Promise<number> {
    const { lastInsertRowid } = await this.db.insert(filesTable).values(input);
    return lastInsertRowid as number;
  }

  async get(
    id: number
  ): Promise<{ found: false; file: null } | { found: true; file: File }> {
    const files = await this.db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, id));

    const file = files[0];
    if (!file) {
      return { found: false, file: null };
    }
    return { found: true, file };
  }

  async remove(id: number) {
    await this.db.delete(filesTable).where(eq(filesTable.id, id));
  }
}

export * from "./schema.js";
