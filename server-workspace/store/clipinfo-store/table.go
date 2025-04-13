package clipinfostore

import "database/sql"

func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS clipinfo (
		id TEXT NOT NULL PRIMARY KEY, 
		fps INTEGER, 
		frame_count INTEGER, 
		frame_width INTEGER, 
		frame_height INTEGER,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createTableSql)
	return err
}
