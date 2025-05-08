package adapter

import (
	"bytes"
	"testing"

	servicemodels "quick-reel.com/service/src/service-models"
	templateservice "quick-reel.com/service/src/template-service"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/util"
)

func TestPrintAllTemplates(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "[{\"id\":\"1\",\"name\":\"template1\",\"videoUrl\":\"https://url.mp4\"},{\"id\":\"2\",\"name\":\"template2\",\"videoUrl\":\"https://url.mp4\"}]",
		},
	}

	for _, tc := range tt {
		buf := &bytes.Buffer{}

		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			templateService := &templateservice.MockTemplateService{
				ListAllResult: []servicemodels.TemplateLite{
					{
						Id:       "1",
						Name:     "template1",
						VideoUrl: "https://url.mp4",
					},
					{
						Id:       "2",
						Name:     "template2",
						VideoUrl: "https://url.mp4",
					},
				},
			}
			PrintAllTemplates(ctx, templateService, buf)
			if !util.CompareJSON(buf.String(), tc.want) {
				t.Errorf("printAllTemplates() = %v, want %v", buf.String(), tc.want)
			}
		})
	}
}
