package templateservice

import (
	"context"

	servicemodels "quick-reel.com/service/service-models"
	templatestore "quick-reel.com/store/template-store"
)

type FetchAllTemplatesDependencies struct {
	TemplateStore templatestore.ITemplateStore
}

func fetchAllTemplates(ctx context.Context, dependencies FetchAllTemplatesDependencies) ([]servicemodels.TemplateLite, error) {
	templates, err := dependencies.TemplateStore.List(ctx)
	if err != nil {
		return nil, err
	}

	templateLites := make([]servicemodels.TemplateLite, 0)

	for _, template := range templates {
		templateLites = append(templateLites, servicemodels.TemplateLite{
			Id:       template.Id,
			Name:     template.Name,
			VideoUrl: template.VideoUrl,
		})
	}

	return templateLites, nil

}
