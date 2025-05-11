package tests

import (
	"bytes"
	"io"
	"net/http/httptest"
	"testing"

	servicemodels "quick-reel.com/service/src/service-models"
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

func TestListAllTemplatesHandler(t *testing.T) {
	tt := []struct {
		name              string
		createdTemplateId string
		want              string
	}{
		{
			name: "success",
			want: `[{"id":"1","name":"template1","videoUrl":"https://url.mp4"}]`,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatal(err)
			}

			templateService := &templateservice.MockTemplateService{
				ListAllResult: []servicemodels.TemplateLite{
					{
						Id:       "1",
						Name:     "template1",
						VideoUrl: "https://url.mp4",
					},
				},
			}

			apiHandler := handler.ApiHandler{}

			handler := apiHandler.ListAllTemplates(ctx, templateService)
			req := httptest.NewRequest("GET", "/api/templates", nil)
			res := httptest.NewRecorder()

			handler(res, req)
			defer res.Result().Body.Close()

			result, err := io.ReadAll(res.Result().Body)

			if err != nil {
				t.Fatal(err)
			}

			if string(result) != tc.want {
				t.Errorf("handler returned unexpected body: got %v want %v", string(result), tc.want)
			}

		})
	}

}
