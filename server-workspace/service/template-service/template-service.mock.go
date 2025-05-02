package templateservice

import (
	"context"

	servicemodels "quick-reel.com/service/service-models"
)

type MockTemplateService struct {
	ListAllCalled     bool
	ListAllResult     []servicemodels.TemplateLite
	CreateCalled      bool
	CreatedTemplateId string
	GetCalled         bool
	GetResult         *servicemodels.TemplateFull
	RemoveCalled      bool
}

func (service *MockTemplateService) ListAll(ctx context.Context) ([]servicemodels.TemplateLite, error) {
	service.ListAllCalled = true
	return service.ListAllResult, nil
}

func (service *MockTemplateService) Create(ctx context.Context, input CreateTemplateInput) (string, error) {
	service.CreateCalled = true
	return service.CreatedTemplateId, nil
}

func (service *MockTemplateService) Get(ctx context.Context, id string) (*servicemodels.TemplateFull, error) {
	service.GetCalled = true
	return service.GetResult, nil
}

func (service *MockTemplateService) Remove(ctx context.Context, id string) error {
	service.RemoveCalled = true
	return nil
}
