CREATE TABLE `sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`kind` text NOT NULL,
	`url` text,
	`object_key` text,
	`excerpt` text,
	`created_at` text NOT NULL
);
