package clipinfostore

import "context"

type IClipInfoStore interface {
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SaveClipInfoInput) (string, error)
}

// Using Sqlite
type ClipInfoStore struct{}

func (store *ClipInfoStore) Save(ctx context.Context, input SaveClipInfoInput) (string, error) {
	return saveClipInfo(ctx, input)
}

func (store *ClipInfoStore) Remove(ctx context.Context, id string) error {
	return removeClipInfo(ctx, id)
}
