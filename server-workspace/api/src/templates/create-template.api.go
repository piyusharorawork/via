package templates

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	templateservice "quick-reel.com/service/src/template-service"
)

type CreateTemplateInput struct {
	Name       string `json:"name"`
	WebsiteUrl string `json:"websiteUrl"`
}

func createTemplateApi(ctx context.Context, templateService templateservice.ITemplateService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)

		if err != nil {
			http.Error(w, "unable to read request body", http.StatusBadRequest)
			return
		}
		defer r.Body.Close()

		var input CreateTemplateInput

		err = json.Unmarshal(body, &input)

		if err != nil {
			http.Error(w, "unable to unmarshal request body", http.StatusBadRequest)
			return
		}

		in := templateservice.CreateTemplateInput{
			Name:       input.Name,
			WebsiteUrl: input.WebsiteUrl,
			OnProgress: func(progress int, message string) {
				// sendChunk(w, flusher, message, progress)
			},
		}

		templateId, err := templateService.Create(ctx, in)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(templateId))

	}

}
