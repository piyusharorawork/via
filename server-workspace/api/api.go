package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"quickreel.com/api/handler"
)

func main() {
	router := mux.NewRouter()
	router.Use(corsMiddleware)

	router.HandleFunc("/api", handler.HomeHandler).Methods("GET")
	router.HandleFunc("/api/templates", handler.CreateTemplateHandler).Methods("POST")
	router.HandleFunc("/api/templates", handler.ListAllTemplatesHandler).Methods("GET")
	router.HandleFunc("/api/templates/{id}", handler.GetTemplateHandler).Methods("GET")
	router.HandleFunc("/api/templates/{id}", handler.RemoveTemplateHandler).Methods("DELETE", "OPTIONS")

	http.ListenAndServe(":8080", router)

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
