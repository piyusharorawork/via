package snapshotstore

import (
	"database/sql"
	"fmt"
)

const (
	TABLE_NAME = "snapshot"
)

func createTable(db *sql.DB) error {
	createTableSql := fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		id TEXT NOT NULL PRIMARY KEY, 
		frame_no INTEGER, 
		image_url TEXT
	);`, TABLE_NAME)

	_, err := db.Exec(createTableSql)
	return err
}
