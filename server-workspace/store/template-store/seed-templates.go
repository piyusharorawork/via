package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
	"quick-reel.com/store/table"
)

func seedTemplates(ctx context.Context, templates []*storemodels.Template, table *table.Table) error {
	if len(templates) == 0 {
		return nil
	}

	const sql = `
	INSERT INTO template (id, name, website_url, video_url, audio_url, clipinfo_id, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ? , ?, ?);
	`

	for _, template := range templates {
		err := table.Execute(ctx, sql,
			template.Id,
			template.Name,
			template.WebsiteUrl,
			template.VideoUrl,
			template.AudioUrl,
			template.ClipInfoId,
			template.CreatedAt,
			template.UpdatedAt,
		)

		if err != nil {
			return err
		}
	}

	return nil
}
