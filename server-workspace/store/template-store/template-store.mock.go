package templatestore

import "context"

type MockTemplateStore struct {
	SaveCalled   bool
	RemoveCalled bool
	SavedId      string
}

func (m *MockTemplateStore) Save(ctx context.Context, input SaveTemplateInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockTemplateStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}
