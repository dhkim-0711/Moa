import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sources = sqliteTable("sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  url: text("url"),
  objectKey: text("object_key"),
  excerpt: text("excerpt"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});
