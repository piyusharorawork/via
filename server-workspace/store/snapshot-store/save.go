package snapshotstore

import (
	"context"

	"github.com/google/uuid"
	commonstore "quick-reel.com/store/store-common"
)

type SaveSnapShotInput struct {
	FrameNo  int
	ImageUrl string
}

func save(ctx context.Context, input SaveSnapShotInput) (string, error) {
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
	INSERT INTO snapshot (id, frame_no, image_url) 
	VALUES (?, ?, ?);`

	id := uuid.NewString()

	_, err = db.Exec(insertDataSql, id, input.FrameNo, input.ImageUrl)
	if err != nil {
		return "", err
	}

	return id, nil

}
