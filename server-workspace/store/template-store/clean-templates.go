package templatestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
)

func cleanTemplates(ctx context.Context) error {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return err
	}

	sql := `
	DELETE FROM template;`

	_, err = db.Exec(sql)
	return err
}
