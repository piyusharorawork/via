package adapter

import (
	"context"

	templateservice "quick-reel.com/service/template-service"
)

func CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService, templateName string, websiteUrl string) (string, error) {
	input := templateservice.CreateTemplateInput{
		Name:       templateName,
		WebsiteUrl: websiteUrl,
	}
	return templateService.Create(ctx, input)
}
