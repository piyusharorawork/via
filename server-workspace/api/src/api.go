package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"quickreel.com/api/src/handler"
)

func main() {
	router := mux.NewRouter()
	router.Use(corsMiddleware)

	router.HandleFunc("/api", handler.HomeHandler).Methods("GET")
	router.HandleFunc("/api/templates", handler.CreateTemplateHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/templates", handler.ListAllTemplatesHandler).Methods("GET")
	router.HandleFunc("/api/templates/{id}", handler.GetTemplateHandler).Methods("GET")
	router.HandleFunc("/api/templates/{id}", handler.RemoveTemplateHandler).Methods("DELETE", "OPTIONS")

	fmt.Println("Starting server at port 8080")
	err := http.ListenAndServe(":8080", router)

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
