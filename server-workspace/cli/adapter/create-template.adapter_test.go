package adapter

import (
	"bytes"
	"testing"

	servicemodels "quick-reel.com/service/service-models"
	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
)

func TestCreateAdapter(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: `{"id":"12345","name":"templateName","websiteUrl":"","videoUrl":"https://url.com","audioUrl":"","clipInfo":null,"previewFrames":null}`,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Errorf("get test ctx failed")
			}

			buf := &bytes.Buffer{}

			templateService := &templateservice.MockTemplateService{
				CreatedTemplateId: "12345",
				GetResult: &servicemodels.TemplateFull{
					Id:       "12345",
					Name:     "templateName",
					VideoUrl: "https://url.com",
				},
			}

			CreateTemplate(ctx, templateService, "templateName", "https://url.com", buf)

			got := buf.String()
			if got != tc.want {
				t.Errorf("got %s, want %s", got, tc.want)
			}

		})
	}

}
