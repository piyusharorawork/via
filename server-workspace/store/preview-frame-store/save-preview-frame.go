package previewframestore

import (
	"context"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
	"quick-reel.com/store/table"
)

type SavePreviewFrameInput struct {
	TemplateId string
	FrameNo    int
	ImageUrl   string
}

func savePreviewFrame(ctx context.Context, input SavePreviewFrameInput, table *table.Table) (string, error) {
	const sql = `
	INSERT INTO preview_frame (id,template_id,frame_no, image_url)  
	VALUES (?, ?, ?, ?);
	`

	id := uuid.NewString()

	err := table.Execute(ctx, sql, id, input.TemplateId, input.FrameNo, input.ImageUrl)
	if err != nil {
		return "", err
	}

	return id, nil

}
