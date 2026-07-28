ALTER TABLE `sources` ADD `content` text;--> statement-breakpoint
ALTER TABLE `sources` ADD `status` text DEFAULT 'ready' NOT NULL;