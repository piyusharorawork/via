package handler

import (
	"context"
	"net/http"

	templateservice "quick-reel.com/service/src/template-service"
)

// TODO Template Handler
type IApiHandler interface {
	CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc
}

type ApiHandler struct {
}

func (handler *ApiHandler) CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return createTemplateHandler(ctx, templateService)
}
