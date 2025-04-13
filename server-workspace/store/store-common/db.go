package commonstore

import (
	"context"
	"database/sql"

	"quickreel.com/core/model"
)

func CreateDb(ctx context.Context) (*sql.DB, error) {
	dbPath := ctx.Value(model.DbPath).(string)
	return sql.Open("sqlite3", dbPath)
}
