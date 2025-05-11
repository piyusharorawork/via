package handler

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"
	templateservice "quick-reel.com/service/src/template-service"
	"quickreel.com/core/src/util"
)

func getTemplateHandler(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

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
}
