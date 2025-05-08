package clipinfostore

import (
	"context"

	"quick-reel.com/store/src/table"
)

func removeClipInfo(ctx context.Context, id string, table *table.Table) error {
	const sql = `DELETE FROM clipinfo WHERE id = ?;`
	err := table.Execute(ctx, sql, id)
	return err

}
