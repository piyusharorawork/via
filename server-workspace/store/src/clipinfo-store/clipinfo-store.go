package clipinfostore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
	"quick-reel.com/store/src/table"
)

type IClipInfoStore interface {
	Clean(ctx context.Context) error
	Seed(ctx context.Context, clipInfos []*storemodels.ClipInfo) error

	// Get returns the ClipInfo for the given id.
	Get(ctx context.Context, id string) (*storemodels.ClipInfo, error)

	// Remove removes the ClipInfo for the given id.
	Remove(ctx context.Context, id string) error

	// Save saves the ClipInfo for the given id.
	Save(ctx context.Context, input SaveClipInfoInput) (string, error)
}

// Using Sqlite
type ClipInfoStore struct{}

func (store *ClipInfoStore) Clean(ctx context.Context) error {
	table := getTable()
	return cleanClipInfo(ctx, table)
}

func (store *ClipInfoStore) Seed(ctx context.Context, clipInfos []*storemodels.ClipInfo) error {
	table := getTable()
	return seedClipInfos(ctx, clipInfos, table)
}

func (store *ClipInfoStore) Get(ctx context.Context, id string) (*storemodels.ClipInfo, error) {
	table := getTable()
	return getClipInfo(ctx, id, table)
}

func (store *ClipInfoStore) Save(ctx context.Context, input SaveClipInfoInput) (string, error) {
	table := getTable()
	return saveClipInfo(ctx, input, table)
}

func (store *ClipInfoStore) Remove(ctx context.Context, id string) error {
	table := getTable()
	return removeClipInfo(ctx, id, table)
}

func getTable() *table.Table {
	const sql = `
		CREATE TABLE IF NOT EXISTS clipinfo (
		id TEXT NOT NULL PRIMARY KEY, 
		fps INTEGER NOT NULL, 
		frame_count INTEGER NOT NULL, 
		frame_width INTEGER NOT NULL DEFAULT 0, 
		frame_height INTEGER NOT NULL DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP )
	`
	table := &table.Table{
		SqlQuery: sql,
	}

	return table
}
