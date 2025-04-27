package previewframestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
)

func remove(ctx context.Context, id string) error {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return err
	}

	removeDataSql := `
	DELETE FROM preview_frame WHERE id = ?;`

	_, err = db.Exec(removeDataSql, id)
	return err

}
