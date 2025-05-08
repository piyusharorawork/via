package previewframestore

import (
	"context"

	"quick-reel.com/store/src/table"
)

func removeManyPreviewFrames(ctx context.Context, templateId string, table *table.Table) error {
	const sql = `DELETE FROM preview_frame WHERE template_id = ?;`

	err := table.Execute(ctx, sql, templateId)
	return err

}
