package templates

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"
	templateservice "quick-reel.com/service/src/template-service"
)

func removeTemplateHandler(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		vars := mux.Vars(r)
		id := vars["id"]

		err := templateService.Remove(ctx, id)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error":"internal context error"}`))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("ok"))

	}
}
