package handler

import (
	"net/http"

	"quickreel.com/core/src/util"
)

type HomeOutput struct {
	Message string `json:"message"`
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {

	output := HomeOutput{
		Message: "Hello World",
	}

	json, err := util.ToJSON(output)

	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))

}
