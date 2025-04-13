package templateservice

import "context"

type ITemplateService interface {
	createTemplate(ctx context.Context, input CreateTemplateInput) (string, error)
}

type TemplateService struct{}

func (service *TemplateService) createTemplate(ctx context.Context, input CreateTemplateInput) (string, error) {
	return createTemplate(ctx, input)
}
