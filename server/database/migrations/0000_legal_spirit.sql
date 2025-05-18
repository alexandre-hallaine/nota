CREATE TABLE `notes`
(
    `id`         integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `content`    text    NOT NULL,
    `email`      text    NOT NULL,
    `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notes_email_unique` ON `notes` (`email`);