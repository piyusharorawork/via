package table

import (
	"context"
	"database/sql"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
)

type Table struct {
	SqlQuery string
}

func (t *Table) Execute(ctx context.Context, sqlQuery string, args ...any) error {
	db, err := getDb(ctx, t.SqlQuery)

	if err != nil {
		return err
	}
	defer db.Close()

	if args == nil {
		_, err := db.Exec(sqlQuery)
		return err
	}

	_, err = db.Exec(sqlQuery, args...)
	return err
}

func (t *Table) Query(ctx context.Context, sqlQuery string, args ...any) (*sql.Rows, error) {
	db, err := getDb(ctx, t.SqlQuery)

	if err != nil {
		return nil, err
	}

	defer db.Close()

	if args == nil {
		rows, err := db.Query(sqlQuery)
		return rows, err
	}

	rows, err := db.Query(sqlQuery, args...)
	return rows, err
}

func getDb(ctx context.Context, tableSqlQuery string) (*sql.DB, error) {
	dbPath, err := myctx.GetValue(ctx, model.DbPath)

	if err != nil {
		return nil, err
	}
	db, err := sql.Open("sqlite3", dbPath)

	if err != nil {
		return nil, err
	}

	_, err = db.Exec(tableSqlQuery)

	if err != nil {
		return nil, err
	}

	return db, nil
}
