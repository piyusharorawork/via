package tests

import (
	"bytes"
	"io"
	"net/http/httptest"
	"testing"

	templateservice "quick-reel.com/service/src/template-service"
	"quickreel.com/api/src/handler"
	myctx "quickreel.com/core/src/ctx"
)

func TestCreateTemplateHandler(t *testing.T) {
	tt := []struct {
		name              string
		reqBody           string
		createdTemplateId string
		want              string
	}{
		{
			name:              "success",
			reqBody:           `{"name":"template1","websiteUrl":"https://url.mp4"}`,
			createdTemplateId: "1",
			want:              "1",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatal(err)
			}

			templateService := &templateservice.MockTemplateService{
				CreatedTemplateId: tc.createdTemplateId,
			}

			apiHandler := handler.ApiHandler{}

			handler := apiHandler.CreateTemplate(ctx, templateService)
			body := bytes.NewBufferString(tc.reqBody)
			req := httptest.NewRequest("POST", "/api/templates", body)
			res := httptest.NewRecorder()

			handler(res, req)
			defer res.Result().Body.Close()

			result, err := io.ReadAll(res.Result().Body)

			if err != nil {
				t.Fatal(err)
			}

			if string(result) != "1" {
				t.Errorf("handler returned unexpected body: got %v want %v", string(result), "1")
			}

		})
	}

}
