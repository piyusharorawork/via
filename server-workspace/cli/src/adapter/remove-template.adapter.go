package adapter

import (
	"context"

	templateservice "quick-reel.com/service/src/template-service"
)

func RemoveTemplate(ctx context.Context, id string, templateService templateservice.ITemplateService) {
	err := templateService.Remove(ctx, id)

	if err != nil {
		panic(err)
	}

}
