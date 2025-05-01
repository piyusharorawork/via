package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
	"quick-reel.com/store/table"
)

func fetchTemplates(ctx context.Context, table *table.Table) ([]*storemodels.Template, error) {
	const sql = `SELECT * FROM template;`
	rows, err := table.Query(ctx, sql)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	templates := make([]*storemodels.Template, 0)

	for rows.Next() {
		var template storemodels.Template
		err = rows.Scan(&template.Id, &template.Name, &template.WebsiteUrl, &template.VideoUrl, &template.AudioUrl, &template.ClipInfoId, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return nil, err
		}
		templates = append(templates, &template)

	}

	return templates, nil

}
