package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
	"quick-reel.com/store/table"
)

func getPreviewFrame(ctx context.Context, id string, table *table.Table) ([]*storemodels.PreviewFrame, error) {

	const sql = `SELECT  * from preview_frame where template_id = ?;`

	rows, err := table.Query(ctx, sql, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	previewFrames := []*storemodels.PreviewFrame{}

	for rows.Next() {
		var previewFrame storemodels.PreviewFrame
		err = rows.Scan(&previewFrame.Id, &previewFrame.FrameNo, &previewFrame.ImageUrl, &previewFrame.TemplateId, &previewFrame.CreatedAt, &previewFrame.UpdatedAt)
		if err != nil {
			return nil, err
		}
		previewFrames = append(previewFrames, &previewFrame)
	}

	return previewFrames, nil
}
