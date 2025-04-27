package templatestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func seedTemplates(ctx context.Context, templates []*storemodels.Template) error {
	if len(templates) == 0 {
		return nil
	}

	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return err
	}

	sql := `INSERT INTO template (id, name, website_url, video_url, audio_url, clipinfo_id, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ? , ?, ?);`

	for _, template := range templates {
		_, err := db.Exec(sql, template.Id, template.Name, template.WebsiteUrl, template.VideoUrl, template.AudioUrl, template.ClipInfoId, template.CreatedAt, template.UpdatedAt)
		if err != nil {
			return err
		}
	}

	return nil
}
