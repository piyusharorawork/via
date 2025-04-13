package templatestore

import (
	"context"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
	commonstore "quick-reel.com/store/store-common"
)

type SaveTemplateInput struct {
	Name       string
	WebsiteUrl string
	VideoUrl   string
	AudioUrl   string
	ClipInfoId string
}

func save(ctx context.Context, input SaveTemplateInput) (string, error) {
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
	INSERT INTO template (id, name, website_url, video_url, audio_url, clipinfo_id) 
	VALUES (?, ?, ?, ?, ?, ?);`

	id := uuid.NewString()

	_, err = db.Exec(insertDataSql, id, input.Name, input.WebsiteUrl, input.VideoUrl, input.AudioUrl, input.ClipInfoId)
	if err != nil {
		return "", err
	}

	return id, nil

}
