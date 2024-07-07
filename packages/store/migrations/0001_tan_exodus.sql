CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_name` text NOT NULL,
	`mime_type` text NOT NULL,
	`destination` text NOT NULL,
	`file_name` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
