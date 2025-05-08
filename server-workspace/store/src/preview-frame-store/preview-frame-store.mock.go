package previewframestore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
)

type MockPreviewFrameStore struct {
	SaveCalled       bool
	RemoveManyCalled bool
	SavedId          string
	FetchCalled      bool
	FetchResult      []*storemodels.PreviewFrame
}

func (m *MockPreviewFrameStore) Clean(ctx context.Context) error {
	return nil
}

func (m *MockPreviewFrameStore) Seed(ctx context.Context, previewFrames []*storemodels.PreviewFrame) error {
	return nil
}

func (m *MockPreviewFrameStore) Fetch(ctx context.Context, templateId string) ([]*storemodels.PreviewFrame, error) {
	m.FetchCalled = true
	return m.FetchResult, nil
}

func (m *MockPreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockPreviewFrameStore) RemoveMany(ctx context.Context, id string) error {
	m.RemoveManyCalled = true
	return nil
}
