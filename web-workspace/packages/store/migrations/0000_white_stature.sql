CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_name` text NOT NULL,
	`mime_type` text NOT NULL,
	`destination` text NOT NULL,
	`file_name` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`file_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`descrption` text NOT NULL,
	`fps` real NOT NULL,
	`frame_count` integer NOT NULL,
	`frame_width` integer NOT NULL,
	`frame_height` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
