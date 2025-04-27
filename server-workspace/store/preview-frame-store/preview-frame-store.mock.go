package previewframestore

import "context"

type MockPreviewFrameStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
}

func (m *MockPreviewFrameStore) Save(ctx context.Context, input SavePreviewFrameInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockPreviewFrameStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
