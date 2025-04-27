package main

import (
	"net/http"

	"quickreel.com/api/handler"
)

func main() {
	http.HandleFunc("/api", handler.HomeHandler)
	http.HandleFunc("/api/templates", handler.ListAllTemplatesHandler)

	http.ListenAndServe(":8080", nil)

}
