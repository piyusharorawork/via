package templateservice

import (
	"context"

	servicemodels "quick-reel.com/service/src/service-models"
	templatestore "quick-reel.com/store/src/template-store"
)

type FetchAllTemplatesDependencies struct {
	TemplateStore templatestore.ITemplateStore
}

func fetchAllTemplates(ctx context.Context, dependencies FetchAllTemplatesDependencies) ([]servicemodels.TemplateLite, error) {
	templates, err := dependencies.TemplateStore.Fetch(ctx)
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
