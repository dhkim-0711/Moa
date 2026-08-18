import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const sources = sqliteTable("sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  url: text("url"),
  objectKey: text("object_key"),
  excerpt: text("excerpt"),
  content: text("content"),
  status: text("status").notNull().default("ready"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const discoveryTopics = sqliteTable("discovery_topics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  query: text("query").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  lastRunAt: text("last_run_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
}, (table) => [uniqueIndex("idx_discovery_topics_query").on(table.query)]);

export const discoveryCandidates = sqliteTable("discovery_candidates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  topicId: integer("topic_id").references(() => discoveryTopics.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  summary: text("summary"),
  host: text("host"),
  relevance: integer("relevance").notNull().default(70),
  publishedAt: text("published_at"),
  status: text("status").notNull().default("pending"),
  discoveredAt: text("discovered_at").notNull().$defaultFn(() => new Date().toISOString()),
}, (table) => [
  uniqueIndex("idx_discovery_candidates_url").on(table.url),
]);

export const blockedHosts = sqliteTable("blocked_hosts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  host: text("host").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
}, (table) => [uniqueIndex("idx_blocked_hosts_host").on(table.host)]);
