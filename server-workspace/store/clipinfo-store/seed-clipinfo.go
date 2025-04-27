package clipinfostore

import (
	"context"

	commonstore "quick-reel.com/store/store-common"
	storemodels "quick-reel.com/store/store-models"
)

func seedClipInfos(ctx context.Context, clipInfos []*storemodels.ClipInfo) error {
	if len(clipInfos) == 0 {
		return nil
	}

	db, err := commonstore.CreateDb(ctx)

	if err != nil {
		return err
	}

	defer db.Close()

	err = createTable(db)

	if err != nil {
		return err
	}

	sql := `INSERT INTO clipinfo (id,fps,frame_count,frame_width,frame_height,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);`

	for _, clipInfo := range clipInfos {
		_, err = db.Exec(sql, clipInfo.Id, clipInfo.Fps, clipInfo.FrameCount, clipInfo.FrameWidth, clipInfo.FrameHeight, clipInfo.CreatedAt, clipInfo.UpdatedAt)
		if err != nil {
			return err
		}
	}

	return nil
}
