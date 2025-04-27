package templateservice

import "context"

type MockTemplateService struct {
	ListAllCalled     bool
	ListAllResult     []TemplateLite
	CreateCalled      bool
	CreatedTemplateId string
}

func (service *MockTemplateService) ListAll(ctx context.Context) ([]TemplateLite, error) {
	service.ListAllCalled = true
	return service.ListAllResult, nil
}

func (service *MockTemplateService) Create(ctx context.Context, input CreateTemplateInput) (string, error) {
	service.CreateCalled = true
	return service.CreatedTemplateId, nil
}
