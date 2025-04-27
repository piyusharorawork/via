package previewframestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func getPreviewFrame(ctx context.Context, id string) (*storemodels.PreviewFrame, error) {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return nil, err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return nil, err
	}

	sql := `SELECT  * from preview_frame where id = ?;`

	rows, err := db.Query(sql, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	previewFrame := storemodels.PreviewFrame{}

	for rows.Next() {
		err = rows.Scan(&previewFrame.Id, &previewFrame.FrameNo, &previewFrame.ImageUrl, &previewFrame.TemplateId, &previewFrame.CreatedAt, &previewFrame.UpdatedAt)
		if err != nil {
			return nil, err
		}
	}

	return &previewFrame, nil
}
