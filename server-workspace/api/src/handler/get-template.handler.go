package handler

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"
	templateservice "quick-reel.com/service/src/template-service"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/util"
)

func GetTemplateHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	templateService := templateservice.TemplateService{
		TemplateStore:     &templatestore.TemplateStore{},
		ClipInfoStore:     &clipinfostore.ClipInfoStore{},
		PreviewFrameStore: &previewframestore.PreviewFrameStore{},
	}
	ctx, err := myctx.GetCtx()

	if err != nil {
		panic(err)
	}
	getTemplate(ctx, id, &templateService, w)

}

func getTemplate(ctx context.Context, id string, templateService templateservice.ITemplateService, w Writer) {
	template, err := templateService.Get(ctx, id)

	if err != nil {
		panic(err)
	}

	json, err := util.ToJSON(template)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))

}
