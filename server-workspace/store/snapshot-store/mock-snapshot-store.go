package snapshotstore

import "context"

type MockSnapshotStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
}

func (m *MockSnapshotStore) Save(ctx context.Context, input SaveSnapShotInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockSnapshotStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
