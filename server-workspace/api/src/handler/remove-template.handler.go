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
)

func RemoveTemplateHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	templateService := templateservice.TemplateService{
		TemplateStore:     &templatestore.TemplateStore{},
		ClipInfoStore:     &clipinfostore.ClipInfoStore{},
		PreviewFrameStore: &previewframestore.PreviewFrameStore{},
	}
	ctx, err := myctx.GetCtx()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error":"internal context error"}`))
		return
	}

	removeTemplate(ctx, id, &templateService, w)

}

func removeTemplate(ctx context.Context, id string, templateService templateservice.ITemplateService, w Writer) {
	err := templateService.Remove(ctx, id)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("ok"))
}
