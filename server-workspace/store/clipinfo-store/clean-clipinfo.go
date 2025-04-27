package clipinfostore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
)

func cleanClipInfo(ctx context.Context) error {
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
	DELETE FROM clipinfo;`

	_, err = db.Exec(sql)
	return err
}
