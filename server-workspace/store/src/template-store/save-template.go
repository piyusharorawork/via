package templatestore

import (
	"context"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
	"quick-reel.com/store/src/table"
)

type SaveTemplateInput struct {
	Name       string
	WebsiteUrl string
	VideoUrl   string
	AudioUrl   string
	ClipInfoId string
}

func saveTemplate(ctx context.Context, input SaveTemplateInput, table *table.Table) (string, error) {

	id := uuid.NewString()

	const sql = `
	INSERT INTO template (id, name, website_url, video_url, audio_url, clipinfo_id) 
	VALUES (?, ?, ?, ?, ?, ?);
	`

	err := table.Execute(ctx, sql, id, input.Name, input.WebsiteUrl, input.VideoUrl, input.AudioUrl, input.ClipInfoId)

	if err != nil {
		return "", err
	}

	return id, nil

}
