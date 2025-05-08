package clipinfostore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
	"quick-reel.com/store/src/table"
)

func getClipInfo(ctx context.Context, id string, table *table.Table) (*storemodels.ClipInfo, error) {
	const sql = `SELECT  * from clipinfo where id = ?;`

	rows, err := table.Query(ctx, sql, id)

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
