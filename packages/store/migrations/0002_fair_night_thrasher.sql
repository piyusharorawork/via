ALTER TABLE `videos` ADD `file_id` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `videos` ADD `name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `videos` ADD `description` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `videos` DROP COLUMN `url`;