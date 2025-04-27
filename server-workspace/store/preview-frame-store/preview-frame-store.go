package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
)

type IPreviewFrameStore interface {
	Clean(ctx context.Context) error
	Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error
	Get(ctx context.Context, id string) (*storemodels.PreviewFrame, error)
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SavePreviewFrameInput) (string, error)
}

// Using Sqlite
type PreviewFrameStore struct{}

func (store *PreviewFrameStore) Clean(ctx context.Context) error {
	return cleanPreviewFrames(ctx)
}

func (store *PreviewFrameStore) Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error {
	return seedPreviewFrames(ctx, previewFrames)
}

func (store *PreviewFrameStore) Get(ctx context.Context, id string) (*storemodels.PreviewFrame, error) {
	return getPreviewFrame(ctx, id)
}

func (store *PreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	return save(ctx, input)
}

func (store *PreviewFrameStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}
