import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { Video, videosTable } from "./schema.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { eq } from "drizzle-orm";

export const createVideoStore = (databaseName: string) => {
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
    list: async (): Promise<Video[]> => {
      const videos = await db.select().from(videosTable);
      return videos;
    },

    insert: async (videoURL: string) => {
      await db.insert(videosTable).values({ url: videoURL });
    },

    remove: async (videoId: number) => {
      await db.delete(videosTable).where(eq(videosTable.id, videoId));
    },
  };
};
