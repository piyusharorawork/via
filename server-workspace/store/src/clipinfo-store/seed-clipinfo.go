package clipinfostore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
	"quick-reel.com/store/src/table"
)

func seedClipInfos(ctx context.Context, clipInfos []*storemodels.ClipInfo, table *table.Table) error {
	const sql = `INSERT INTO clipinfo (id,fps,frame_count,frame_width,frame_height,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);`
	for _, clipInfo := range clipInfos {
		err := table.Execute(ctx, sql, clipInfo.Id, clipInfo.Fps, clipInfo.FrameCount, clipInfo.FrameWidth, clipInfo.FrameHeight, clipInfo.CreatedAt, clipInfo.UpdatedAt)
		if err != nil {
			return err
		}
	}

	return nil
}
