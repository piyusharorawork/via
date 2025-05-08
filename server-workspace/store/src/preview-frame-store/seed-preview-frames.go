package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
	"quick-reel.com/store/src/table"
)

func seedPreviewFrames(ctx context.Context, previewFrames []*storemodels.PreviewFrame, table *table.Table) error {
	if len(previewFrames) == 0 {
		return nil
	}

	const sql = `INSERT INTO preview_frame (id,frame_no,image_url,template_id,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?);`

	for _, previewFrame := range previewFrames {
		err := table.Execute(ctx, sql, previewFrame.Id, previewFrame.FrameNo, previewFrame.ImageUrl, previewFrame.TemplateId, previewFrame.CreatedAt, previewFrame.UpdatedAt)
		if err != nil {
			return err
		}
	}

	return nil
}
