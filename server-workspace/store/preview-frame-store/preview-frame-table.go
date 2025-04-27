package previewframestore

import (
	"database/sql"
)

/*
TODO template id and video project need to separated
*/
func createTable(db *sql.DB) error {
	createTableSql := `
	CREATE TABLE IF NOT EXISTS preview_frame (
		id TEXT NOT NULL PRIMARY KEY, 
		frame_no INTEGER NOT NULL,
		image_url TEXT NOT NULL,
		template_id TEXT NOT NULL, 
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY(template_id) REFERENCES template(id)

	);`

	_, err := db.Exec(createTableSql)
	return err
}
