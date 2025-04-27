package adapter

import (
	"bytes"
	"testing"

	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestPrintAllTemplates(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "[{\"id\":\"1\",\"name\":\"template1\"},{\"id\":\"2\",\"name\":\"template2\"}]",
		},
	}

	for _, tc := range tt {
		buf := &bytes.Buffer{}

		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			templateService := &templateservice.MockTemplateService{
				FetchAllResult: []templateservice.TemplateLite{
					{
						Id:   "1",
						Name: "template1",
					},
					{
						Id:   "2",
						Name: "template2",
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
