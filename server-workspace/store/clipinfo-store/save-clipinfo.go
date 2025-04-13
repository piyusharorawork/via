package clipinfostore

import (
	"context"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"

	"github.com/google/uuid"
	"quickreel.com/core/model"
)

type SaveClipInfoInput struct {
	Fps         int
	FrameCount  int
	FrameWidth  int
	FrameHeight int
}

func saveClipInfo(ctx context.Context, input SaveClipInfoInput) (string, error) {
	dbPath := ctx.Value(model.DbPath).(string)
	db, err := sql.Open("sqlite3", dbPath)

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
