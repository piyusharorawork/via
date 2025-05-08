package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
	"quick-reel.com/store/src/table"
)

type IPreviewFrameStore interface {
	Clean(ctx context.Context) error
	Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error
	Save(ctx context.Context, input SavePreviewFrameInput) (string, error)
	Fetch(ctx context.Context, templateId string) ([]*storemodels.PreviewFrame, error)
	RemoveMany(ctx context.Context, templateId string) error
}

// Using Sqlite
type PreviewFrameStore struct{}

func (store *PreviewFrameStore) Clean(ctx context.Context) error {
	table := getTable()
	return cleanPreviewFrames(ctx, table)
}

func (store *PreviewFrameStore) Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error {
	table := getTable()
	return seedPreviewFrames(ctx, previewFrames, table)
}

func (store *PreviewFrameStore) Fetch(ctx context.Context, templateId string) ([]*storemodels.PreviewFrame, error) {
	table := getTable()
	return getPreviewFrame(ctx, templateId, table)
}

func (store *PreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	table := getTable()
	return savePreviewFrame(ctx, input, table)
}

func (store *PreviewFrameStore) RemoveMany(ctx context.Context, id string) error {
	table := getTable()
	return removeManyPreviewFrames(ctx, id, table)
}

func getTable() *table.Table {
	const sql = `
	CREATE TABLE IF NOT EXISTS preview_frame (
		id TEXT NOT NULL PRIMARY KEY, 
		frame_no INTEGER NOT NULL,
		image_url TEXT NOT NULL,
		template_id TEXT NOT NULL, 
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY(template_id) REFERENCES template(id)

	);
	`
	table := &table.Table{
		SqlQuery: sql,
	}
	return table

}
