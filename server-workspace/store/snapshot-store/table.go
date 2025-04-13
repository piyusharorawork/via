package snapshotstore

import (
	"database/sql"
)

func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS snapshot (
		id TEXT NOT NULL PRIMARY KEY, 
		frame_no INTEGER, 
		image_url TEXT
	);`

	_, err := db.Exec(createTableSql)
	return err
}
