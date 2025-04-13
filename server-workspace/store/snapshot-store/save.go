package snapshotstore

import (
	"context"
	"fmt"

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
	insertDataSql := fmt.Sprintf(`
	INSERT INTO %s (id, frame_no, image_url) 
	VALUES (?, ?, ?);`, TABLE_NAME)

	id := uuid.NewString()

	_, err = db.Exec(insertDataSql, id, input.FrameNo, input.ImageUrl)
	if err != nil {
		return "", err
	}

	return id, nil

}
