package templates

import (
	"context"
	"net/http"

	servicemodels "quick-reel.com/service/src/service-models"
	templateservice "quick-reel.com/service/src/template-service"
	"quickreel.com/core/src/util"
)

func listAllTemplatesHandler(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		templates, err := templateService.ListAll(ctx)

		if err != nil {
			panic(err)
		}

		templatesJson := make([]servicemodels.TemplateLite, 0)

		for _, template := range templates {
			templatesJson = append(templatesJson, servicemodels.TemplateLite{
				Id:       template.Id,
				Name:     template.Name,
				VideoUrl: template.VideoUrl,
			})
		}

		json, err := util.ToJSON(templatesJson)

		if err != nil {
			panic(err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(json))
	}
}
