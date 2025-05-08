package clipinfostore

import (
	"context"

	storemodels "quick-reel.com/store/src/store-models"
)

type MockClipInfoStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
	GetCalled    bool
	GetResult    *storemodels.ClipInfo
}

func (m *MockClipInfoStore) Clean(ctx context.Context) error {
	return nil
}

func (m *MockClipInfoStore) Seed(ctx context.Context, clipInfos []*storemodels.ClipInfo) error {
	return nil
}

func (m *MockClipInfoStore) Get(ctx context.Context, id string) (*storemodels.ClipInfo, error) {
	m.GetCalled = true
	return m.GetResult, nil
}

func (m *MockClipInfoStore) Save(ctx context.Context, input SaveClipInfoInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockClipInfoStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
