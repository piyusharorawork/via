package clipinfostore

import "context"

type MockClipInfoStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
}

func (m *MockClipInfoStore) Save(ctx context.Context, input SaveClipInfoInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockClipInfoStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
