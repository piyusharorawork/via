package templateservice

import (
	"context"

	templatestore "quick-reel.com/store/template-store"
)

type TemplateLite struct {
	Id   string
	Name string
}

type FetchAllTemplatesDependencies struct {
	TemplateStore templatestore.ITemplateStore
}

func fetchAllTemplates(ctx context.Context, dependencies FetchAllTemplatesDependencies) ([]TemplateLite, error) {
	templates, err := dependencies.TemplateStore.List(ctx)
	if err != nil {
		return nil, err
	}

	templateLites := make([]TemplateLite, 0)

	for _, template := range templates {
		templateLites = append(templateLites, TemplateLite{
			Id:   template.Id,
			Name: template.Name,
		})
	}

	return templateLites, nil

}
