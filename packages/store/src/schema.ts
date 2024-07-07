import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const videosTable = sqliteTable("videos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Video = typeof videosTable.$inferSelect;
