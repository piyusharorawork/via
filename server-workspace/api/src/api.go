package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	templateservice "quick-reel.com/service/src/template-service"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
	"quickreel.com/api/src/handler"
	"quickreel.com/core/src/clipinfo"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/extractor"
	"quickreel.com/core/src/uploader"
)

func main() {
	router := mux.NewRouter()
	router.Use(corsMiddleware)
	router.Use(abortMiddleware)

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

	apiHandler := handler.ApiHandler{}

	router.HandleFunc("/api/templates", apiHandler.CreateTemplate(ctx, &templateService)).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/templates", apiHandler.ListAllTemplates(ctx, &templateService)).Methods("GET")
	router.HandleFunc("/api/templates/{id}", apiHandler.GetTemplate(ctx, &templateService)).Methods("GET")
	router.HandleFunc("/api/templates/{id}", apiHandler.RemoveTemplate(ctx, &templateService)).Methods("DELETE", "OPTIONS")

	fmt.Println("Starting server at port 8080")
	err = http.ListenAndServe(":8080", router)

	if err != nil {
		panic(err)
	}

}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Adjust "*" to specific origin if needed for security
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

/*
Abort Middleware to handle client disconnections
*/
func abortMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		notify := r.Context().Done()

		// Create a channel to signal when the handler is done
		done := make(chan struct{})

		go func() {
			next.ServeHTTP(w, r)
			close(done)
		}()

		select {
		case <-notify:
			// Client disconnected
			fmt.Println("Request aborted by client")
			return
		case <-done:
			fmt.Println("Handler completed")
			// Handler completed
			return
		}
	})
}
