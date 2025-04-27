package templatestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func getTemplate(ctx context.Context, id string) (*storemodels.Template, error) {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return nil, err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return nil, err
	}

	sql := `SELECT  * from template where id = ?;`

	rows, err := db.Query(sql, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	template := storemodels.Template{}

	for rows.Next() {
		var template storemodels.Template
		err = rows.Scan(&template.Id, &template.Name, &template.WebsiteUrl, &template.VideoUrl, &template.AudioUrl, &template.Id, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return nil, err
		}
	}

	return &template, nil
}
