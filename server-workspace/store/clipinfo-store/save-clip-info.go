package clipinfostore

import (
	"context"

	_ "github.com/mattn/go-sqlite3"
	commonstore "quick-reel.com/store/store-common"

	"github.com/google/uuid"
)

type SaveClipInfoInput struct {
	Fps         int
	FrameCount  int
	FrameWidth  int
	FrameHeight int
}

func save(ctx context.Context, input SaveClipInfoInput) (string, error) {
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
	INSERT INTO clipinfo(id, fps, frame_count, frame_width, frame_height) 
	VALUES (?, ?, ?, ?, ?);`

	id := uuid.NewString()

	_, err = db.Exec(insertDataSql, id, input.Fps, input.FrameCount, input.FrameWidth, input.FrameHeight)
	if err != nil {
		return "", err
	}

	return id, nil

}
