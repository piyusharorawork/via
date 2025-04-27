package handler

import (
	"bytes"
	"testing"

	templateservice "quick-reel.com/service/template-service"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestFetchAllTemplates(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "{\"templates\":[{\"id\":\"1\",\"name\":\"template1\"},{\"id\":\"2\",\"name\":\"template2\"}]}",
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
				ListAllResult: []templateservice.TemplateLite{
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
			fetchAllTemplates(ctx, templateService, writer)
			if !util.CompareJSON(writer.Body.String(), tc.want) {
				t.Errorf("fetchAllTemplates() = %v, want %v", writer.Body.String(), tc.want)
			}
		})
	}

}
