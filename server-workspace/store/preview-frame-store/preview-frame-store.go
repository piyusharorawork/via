package previewframestore

import "context"

type IPreviewFrameStore interface {
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SavePreviewFrameInput) (string, error)
}

// Using Sqlite
type PreviewFrameStore struct{}

func (store *PreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	return save(ctx, input)
}

func (store *PreviewFrameStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}
