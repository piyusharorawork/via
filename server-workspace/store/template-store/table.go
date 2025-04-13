package templatestore

import (
	"database/sql"
)

func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS template (
		id TEXT NOT NULL PRIMARY KEY, 
		name TEXT NOT NULL, 
		website_url TEXT NOT NULL,
		video_url TEXT NOT NULL,
		audio_url TEXT NOT NULL,
		clipinfo_id TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY(clipinfo_id) REFERENCES clipinfo(id)
	);`

	_, err := db.Exec(createTableSql)
	return err
}
