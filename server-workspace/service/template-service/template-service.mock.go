package templateservice

import "context"

type MockTemplateService struct {
	FetchAllCalled    bool
	FetchAllResult    []TemplateLite
	CreateCalled      bool
	CreatedTemplateId string
}

func (service *MockTemplateService) FetchAll(ctx context.Context) ([]TemplateLite, error) {
	service.FetchAllCalled = true
	return service.FetchAllResult, nil
}

func (service *MockTemplateService) Create(ctx context.Context, input CreateTemplateInput) (string, error) {
	service.CreateCalled = true
	return service.CreatedTemplateId, nil
}
