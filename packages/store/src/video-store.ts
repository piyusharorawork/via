import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { Video, VideoInput, videosTable } from "./schema.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { asc, eq, desc } from "drizzle-orm";

export class VideoStore {
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

    // TODO this must be done at the time of migration as a script
    migrate(this.db, { migrationsFolder });
  }

  async list(limit: number): Promise<Video[]> {
    const videos = await this.db
      .select()
      .from(videosTable)
      .orderBy(desc(videosTable.createdAt))
      .limit(limit);

    return videos;
  }

  async insert(input: VideoInput): Promise<void> {
    await this.db.insert(videosTable).values(input);
  }

  async remove(videoUUID: string): Promise<void> {
    await this.db.delete(videosTable).where(eq(videosTable.uuid, videoUUID));
  }

  async get(
    uuid: string
  ): Promise<{ found: false; video: null } | { found: true; video: Video }> {
    const videos: Video[] = await this.db
      .select()
      .from(videosTable)
      .where(eq(videosTable.uuid, uuid));

    const video = videos[0];
    if (!video) {
      return { found: false, video: null };
    }
    return { found: true, video };
  }
}
