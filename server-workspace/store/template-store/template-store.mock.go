package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
)

type MockTemplateStore struct {
	SaveCalled   bool
	RemoveCalled bool
	ListCalled   bool
	SavedId      string
	ListResult   []*storemodels.Template
}

func (m *MockTemplateStore) Save(ctx context.Context, input SaveTemplateInput) (string, error) {
	m.SaveCalled = true
	return m.SavedId, nil
}

func (m *MockTemplateStore) Remove(ctx context.Context, id string) error {
	m.RemoveCalled = true
	return nil
}

func (m *MockTemplateStore) List(ctx context.Context) ([]*storemodels.Template, error) {
	m.ListCalled = true
	return m.ListResult, nil
}

func (m *MockTemplateStore) Clean(ctx context.Context) error {
	return nil
}
