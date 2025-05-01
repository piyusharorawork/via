package handler

import (
	"bytes"
	"testing"

	servicemodels "quick-reel.com/service/service-models"
	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestGetTemplate(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "{\"id\":\"1\",\"name\":\"template1\",\"websiteUrl\":\"\",\"videoUrl\":\"https://url.mp4\",\"audioUrl\":\"\",\"clipInfo\":null,\"previewFrames\":null}",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			writer := &MockWriter{
				Body: &bytes.Buffer{},
			}

			templateService := &templateservice.MockTemplateService{
				GetResult: &servicemodels.TemplateFull{
					Id:       "1",
					Name:     "template1",
					VideoUrl: "https://url.mp4",
				},
			}
			getTemplate(ctx, "1", templateService, writer)
			if !util.CompareJSON(writer.Body.String(), tc.want) {
				t.Errorf("fetchAllTemplates() = %v, want %v", writer.Body.String(), tc.want)
			}
		})
	}

}
