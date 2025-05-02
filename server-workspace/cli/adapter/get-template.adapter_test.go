package adapter

import (
	"bytes"
	"testing"

	servicemodels "quick-reel.com/service/service-models"
	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestPrintTemplate(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: `{"id":"1","name":"template1","websiteUrl":"","videoUrl":"","audioUrl":"","clipInfo":null,"previewFrames":null}`,
		},
	}

	for _, tc := range tt {
		buf := &bytes.Buffer{}

		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			templateService := &templateservice.MockTemplateService{
				GetResult: &servicemodels.TemplateFull{
					Id:   "1",
					Name: "template1",
				},
			}
			PrintTemplate(ctx, "1", templateService, buf)
			if !util.CompareJSON(buf.String(), tc.want) {
				t.Errorf("printAllTemplates() = %v, want %v", buf.String(), tc.want)
			}
		})
	}
}
