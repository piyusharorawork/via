package previewframestore

import (
	"context"

	"github.com/google/uuid"
	commonstore "quick-reel.com/store/store-common"
)

type SavePreviewFrameInput struct {
	FrameNo  int
	ImageUrl string
}

func save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return "", err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return "", err
	}

	// Insert data
	insertDataSql := `
	INSERT INTO preview_frame (id, frame_no, image_url) 
	VALUES (?, ?, ?);`

	id := uuid.NewString()

	_, err = db.Exec(insertDataSql, id, input.FrameNo, input.ImageUrl)
	if err != nil {
		return "", err
	}

	return id, nil

}
