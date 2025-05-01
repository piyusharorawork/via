package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
	"quick-reel.com/store/table"
)

func getTemplate(ctx context.Context, id string, table *table.Table) (*storemodels.Template, error) {
	const sql = `SELECT * from template where id = ?;`
	rows, err := table.Query(ctx, sql, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	template := storemodels.Template{}

	for rows.Next() {
		err = rows.Scan(&template.Id, &template.Name, &template.WebsiteUrl, &template.VideoUrl, &template.AudioUrl, &template.ClipInfoId, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return nil, err
		}
	}

	return &template, nil
}
