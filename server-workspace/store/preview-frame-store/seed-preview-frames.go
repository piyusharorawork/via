package previewframestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func seedPreviewFrames(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error {
	if len(previewFrames) == 0 {
		return nil
	}

	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return err
	}

	sql := `INSERT INTO preview_frame (id,frame_no,image_url,template_id,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?);`

	for _, previewFrame := range previewFrames {
		_, err = db.Exec(sql, previewFrame.Id, previewFrame.FrameNo, previewFrame.ImageUrl, previewFrame.TemplateId, previewFrame.CreatedAt, previewFrame.UpdatedAt)
		if err != nil {
			return err
		}
	}

	return nil
}
