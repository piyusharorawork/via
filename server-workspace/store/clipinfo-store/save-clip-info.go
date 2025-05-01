package clipinfostore

import (
	"context"

	_ "github.com/mattn/go-sqlite3"
	"quick-reel.com/store/table"

	"github.com/google/uuid"
)

type SaveClipInfoInput struct {
	Fps         int
	FrameCount  int
	FrameWidth  int
	FrameHeight int
}

func saveClipInfo(ctx context.Context, input SaveClipInfoInput, table *table.Table) (string, error) {
	const sql = `
	INSERT INTO clipinfo(id, fps, frame_count, frame_width, frame_height) 
	VALUES (?, ?, ?, ?, ?);
	`

	id := uuid.NewString()

	err := table.Execute(ctx, sql, id, input.Fps, input.FrameCount, input.FrameWidth, input.FrameHeight)
	if err != nil {
		return "", err
	}

	return id, nil

}
