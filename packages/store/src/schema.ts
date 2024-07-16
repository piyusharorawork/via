import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const filesTable = sqliteTable("files", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  destination: text("destination").notNull(),
  fileName: text("file_name").notNull(),
  path: text("path").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const videosTable = sqliteTable("videos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().default("25bfcda6-2e44-42ee-8743-542f4972b94f"),
  fileId: integer("file_id").notNull().default(0),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type File = typeof filesTable.$inferSelect;
export type FileInput = typeof filesTable.$inferInsert;
export type Video = typeof videosTable.$inferSelect;
export type VideoInput = typeof videosTable.$inferInsert;
