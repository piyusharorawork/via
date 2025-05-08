package previewframestore

import (
	"context"

	"quick-reel.com/store/src/table"
)

func cleanPreviewFrames(ctx context.Context, table *table.Table) error {
	const sql = ` 
	DELETE FROM preview_frame;
	`

	err := table.Execute(ctx, sql)

	return err

}
