CREATE TABLE `blocked_hosts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`host` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_blocked_hosts_host` ON `blocked_hosts` (`host`);--> statement-breakpoint
CREATE TABLE `discovery_candidates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`topic_id` integer,
	`query` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`summary` text,
	`host` text,
	`relevance` integer DEFAULT 70 NOT NULL,
	`published_at` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`discovered_at` text NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `discovery_topics`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_discovery_candidates_url` ON `discovery_candidates` (`url`);--> statement-breakpoint
CREATE TABLE `discovery_topics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`query` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`last_run_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_discovery_topics_query` ON `discovery_topics` (`query`);