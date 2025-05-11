package templates

import (
	"context"
	"net/http"

	templateservice "quick-reel.com/service/src/template-service"
)

type ITemplatesApi interface {
	Create(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc
	ListAll(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc
	Get(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc
	Remove(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc
}

type TemplatesApi struct {
}

func (handler *TemplatesApi) Create(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return createTemplateApi(ctx, templateService)
}

func (handler *TemplatesApi) ListAll(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return listAllTemplatesHandler(ctx, templateService)
}

func (handler *TemplatesApi) Get(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return getTemplateHandler(ctx, templateService)
}

func (handler *TemplatesApi) Remove(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return removeTemplateHandler(ctx, templateService)
}
