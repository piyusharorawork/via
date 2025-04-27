package templatestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func listTemplates(ctx context.Context) ([]*storemodels.Template, error) {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return nil, err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return nil, err
	}

	sql := `SELECT  * from template;`

	rows, err := db.Query(sql)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	templates := make([]*storemodels.Template, 0)

	for rows.Next() {
		var template storemodels.Template
		err = rows.Scan(&template.Id, &template.Name, &template.WebsiteUrl, &template.VideoUrl, &template.AudioUrl, &template.ClipInfo.Id, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return nil, err
		}
		templates = append(templates, &template)

	}

	return templates, nil

}
