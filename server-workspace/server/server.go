package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	})
	http.HandleFunc("/make-reel", makeReel)
	http.HandleFunc("/layers", getLayersJSON)

	http.ListenAndServe(":8080", nil)
}
