package clipinfostore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func getClipInfo(ctx context.Context, id string) (*storemodels.ClipInfo, error) {
	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return nil, err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return nil, err
	}
	sql := `SELECT  * from clipinfo where id = ?;`

	rows, err := db.Query(sql, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	clipInfo := storemodels.ClipInfo{}

	for rows.Next() {
		err = rows.Scan(&clipInfo.Id, &clipInfo.Fps, &clipInfo.FrameCount, &clipInfo.FrameWidth, &clipInfo.FrameHeight, &clipInfo.CreatedAt, &clipInfo.UpdatedAt)
		if err != nil {
			return nil, err
		}
	}
	return &clipInfo, nil
}
