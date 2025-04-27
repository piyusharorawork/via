package handler

import (
	"context"
	"net/http"

	servicemodels "quick-reel.com/service/service-models"
	templateservice "quick-reel.com/service/template-service"
	templatestore "quick-reel.com/store/template-store"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func ListAllTemplatesHandler(w http.ResponseWriter, r *http.Request) {
	templateService := templateservice.TemplateService{
		TemplateStore: &templatestore.TemplateStore{},
	}
	ctx, err := myctx.GetCtx()

	if err != nil {
		panic(err)
	}

	fetchAllTemplates(ctx, &templateService, w)

}

func fetchAllTemplates(ctx context.Context, templateService templateservice.ITemplateService, w Writer) {
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte(json))
}
