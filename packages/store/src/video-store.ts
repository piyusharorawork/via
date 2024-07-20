import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { Video, VideoInput, videosTable } from "./schema.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { asc, eq, desc } from "drizzle-orm";

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
    list: async (limit: number): Promise<Video[]> => {
      const videos = await db
        .select()
        .from(videosTable)
        .orderBy(desc(videosTable.createdAt))
        .limit(limit);

      return videos;
    },

    insert: async (input: VideoInput): Promise<void> => {
      await db.insert(videosTable).values(input);
    },

    remove: async (videoUUID: string): Promise<void> => {
      await db.delete(videosTable).where(eq(videosTable.uuid, videoUUID));
    },

    get: async (
      uuid: string
    ): Promise<
      { found: false; video: null } | { found: true; video: Video }
    > => {
      const videos: Video[] = await db
        .select()
        .from(videosTable)
        .where(eq(videosTable.uuid, uuid));

      const video = videos[0];
      if (!video) {
        return { found: false, video: null };
      }
      return { found: true, video };
    },
  };
};
