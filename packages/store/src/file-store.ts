import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { File, FileInput, filesTable } from "./schema.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";

export const createFileStore = (databaseName: string) => {
  const sqlite = new Database(databaseName);
  const db = drizzle(sqlite);

  // TODO cross package paths
  const migrationsFolder = path.join(
    path.resolve(),
    "..",
    "..",
    "packages",
    "store",
    "migrations"
  );

  migrate(db, { migrationsFolder });

  return {
    list: async (): Promise<File[]> => {
      const files = await db.select().from(filesTable);
      return files;
    },

    insert: async (input: FileInput) => {
      const { lastInsertRowid } = await db.insert(filesTable).values(input);
      return lastInsertRowid as number;
    },
  };
};

export * from "./schema.js";
