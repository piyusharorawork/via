package commonstore

import (
	"context"
	"database/sql"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
)

func CreateDb(ctx context.Context) (*sql.DB, error) {
	dbPath, err := myctx.GetValue(ctx, model.DbPath)

	if err != nil {
		return nil, err
	}
	return sql.Open("sqlite3", dbPath)
}
