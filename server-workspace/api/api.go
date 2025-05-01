package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"quickreel.com/api/handler"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api", handler.HomeHandler).Methods("GET")
	router.HandleFunc("/api/templates", handler.ListAllTemplatesHandler).Methods("GET")
	router.HandleFunc("/api/templates/{id}", handler.GetTemplateHandler).Methods("GET")

	http.ListenAndServe(":8080", router)

}
