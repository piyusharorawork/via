package handler

import (
	"bytes"
	"testing"

	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
)

func TestCreateTemplate(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "1",
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
				CreatedTemplateId: "1",
			}

			input := CreateTemplateInput{
				Name:       "template1",
				WebsiteUrl: "https://url.mp4",
			}

			createTemplate(ctx, input, templateService, writer)

			if writer.Body.String() != tc.want {
				t.Errorf("fetchAllTemplates() = %v, want %v", writer.Body.String(), tc.want)
			}
		})
	}

}
