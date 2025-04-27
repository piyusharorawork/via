package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
)

type MockPreviewFrameStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
	GetCalled    bool
	GetResult    *storemodels.PreviewFrame
}

func (m *MockPreviewFrameStore) Clean(ctx context.Context) error {
	return nil
}

func (m *MockPreviewFrameStore) Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error {
	return nil
}

func (m *MockPreviewFrameStore) Get(ctx context.Context, id string) (*storemodels.PreviewFrame, error) {
	m.GetCalled = true
	return m.GetResult, nil
}

func (m *MockPreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockPreviewFrameStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
