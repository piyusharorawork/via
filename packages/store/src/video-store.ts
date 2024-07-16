import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { Video, VideoInput, videosTable } from "./schema.js";
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

    insert: async (input: VideoInput): Promise<void> => {
      await db.insert(videosTable).values(input);
    },

    remove: async (videoId: number): Promise<void> => {
      await db.delete(videosTable).where(eq(videosTable.id, videoId));
    },

    get: async (uuid: string): Promise<Video> => {
      const videos: Video[] = await db
        .select()
        .from(videosTable)
        .where(eq(videosTable.uuid, uuid));

      const video = videos[0];
      if (!video) {
        throw "no video found";
      }
      return video;
    },
  };
};
