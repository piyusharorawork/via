package templatestore

import (
	"context"

	"quick-reel.com/store/table"
)

func cleanTemplates(ctx context.Context, table *table.Table) error {
	const sql = `DELETE FROM template;`
	err := table.Execute(ctx, sql)
	return err
}
