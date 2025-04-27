package clipinfostore

import "database/sql"

func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS clipinfo (
		id TEXT NOT NULL PRIMARY KEY, 
		fps INTEGER NOT NULL, 
		frame_count INTEGER NOT NULL, 
		frame_width INTEGER NOT NULL DEFAULT 0, 
		frame_height INTEGER NOT NULL DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createTableSql)
	return err
}
