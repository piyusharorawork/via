package clipinfostore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
)

type IClipInfoStore interface {
	Clean(ctx context.Context) error
	Seed(ctx context.Context, clipInfos []*storemodels.ClipInfo) error
	Get(ctx context.Context, id string) (*storemodels.ClipInfo, error)
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SaveClipInfoInput) (string, error)
}

// Using Sqlite
type ClipInfoStore struct{}

func (store *ClipInfoStore) Clean(ctx context.Context) error {
	return cleanClipInfo(ctx)
}

func (store *ClipInfoStore) Seed(ctx context.Context, clipInfos []*storemodels.ClipInfo) error {
	return seedClipInfos(ctx, clipInfos)
}

func (store *ClipInfoStore) Get(ctx context.Context, id string) (*storemodels.ClipInfo, error) {
	return getClipInfo(ctx, id)
}

func (store *ClipInfoStore) Save(ctx context.Context, input SaveClipInfoInput) (string, error) {
	return save(ctx, input)
}

func (store *ClipInfoStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}
