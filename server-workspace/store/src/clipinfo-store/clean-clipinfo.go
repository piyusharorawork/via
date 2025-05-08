package clipinfostore

import (
	"context"

	"quick-reel.com/store/src/table"
)

func cleanClipInfo(ctx context.Context, table *table.Table) error {
	const sql = `DELETE FROM clipinfo;`
	err := table.Execute(ctx, sql)
	return err
}
