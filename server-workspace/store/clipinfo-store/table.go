package clipinfostore

import "database/sql"

func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS clipinfo (
		id TEXT NOT NULL PRIMARY KEY, 
		fps INTEGER, 
		frame_count INTEGER, 
		frame_width INTEGER, 
		frame_height INTEGER
	);`

	_, err := db.Exec(createTableSql)
	return err
}
