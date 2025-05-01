package templatestore

import (
	"context"

	"quick-reel.com/store/table"
)

func removeTemplate(ctx context.Context, id string, table *table.Table) error {
	const sql = `DELETE FROM template WHERE id = ?;`
	err := table.Execute(ctx, sql, id)
	return err
}
