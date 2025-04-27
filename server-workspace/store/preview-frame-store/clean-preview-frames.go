package previewframestore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
)

func cleanPreviewFrames(ctx context.Context) error {
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
	DELETE FROM preview_frame;`

	_, err = db.Exec(sql)

	return err

}
