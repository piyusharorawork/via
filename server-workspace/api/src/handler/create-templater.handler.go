package handler

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	templateservice "quick-reel.com/service/src/template-service"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
	"quickreel.com/core/src/clipinfo"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/extractor"
	"quickreel.com/core/src/uploader"
)

type CreateTemplateInput struct {
	Name       string `json:"name"`
	WebsiteUrl string `json:"websiteUrl"`
}

func CreateTemplateHandler(w http.ResponseWriter, r *http.Request) {
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

	ctx, err := myctx.GetCtx()

	if err != nil {
		panic(err)
	}

	templateService := templateservice.TemplateService{
		MediaCreator:      &templateservice.MediaCreator{},
		ClipInfoFactory:   &clipinfo.ClipInfoFactory{},
		ExtractorFactory:  &extractor.ExtractorFactory{},
		UploaderFactory:   &uploader.UploaderFactory{},
		ClipInfoStore:     &clipinfostore.ClipInfoStore{},
		TemplateStore:     &templatestore.TemplateStore{},
		PreviewFrameStore: &previewframestore.PreviewFrameStore{},
	}

	createTemplate(ctx, input, &templateService, w)

}

func createTemplate(ctx context.Context, input CreateTemplateInput, templateService templateservice.ITemplateService, w Writer) {

	// flusher, ok := w.(http.Flusher)

	// if !ok {
	// 	http.Error(w, "Streaming not supported", http.StatusInternalServerError)
	// 	return
	// }

	in := templateservice.CreateTemplateInput{
		Name:       input.Name,
		WebsiteUrl: input.WebsiteUrl,
		OnProgress: func(percent int, message string) {
			// sendChunk(w, flusher, message, percent)
		},
	}

	templateId, err := templateService.Create(ctx, in)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(templateId))

}

// TODO
// func sendChunk(w http.ResponseWriter, flusher http.Flusher, msg string, progress int) {
// 	// message := fmt.Sprintf("%s,%d", msg, progress)
// 	// fmt.Fprint(w, message)
// 	// flusher.Flush() // Flush the response to the client
// }
