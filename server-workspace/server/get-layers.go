package main

import (
	"net/http"

	"quickreel.com/core/util"
)

func getLayersJSON(w http.ResponseWriter, r *http.Request) {
	contents, err := util.ReadFile(layersPath)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Write([]byte(contents))
}
