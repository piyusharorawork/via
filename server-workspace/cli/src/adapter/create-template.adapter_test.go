package adapter

import (
	"bytes"
	"testing"

	templateservice "quick-reel.com/service/src/template-service"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/util"
)

func TestCreateTemplate(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: `{"percent":20,"message":"video and audio urls created"}{"percent":100,"message":"Template saved"}`,
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
				CreatedProgressCalls: []struct {
					Progress int
					Message  string
				}{
					{
						Progress: 20,
						Message:  "video and audio urls created",
					},
					{
						Progress: 100,
						Message:  "Template saved",
					},
				},
			}

			CreateTemplate(ctx, templateService, "templateName", "https://url.com", buf)

			got := buf.String()
			if !util.AreStringsEqual(got, tc.want) {
				t.Errorf("got %s, want %s", got, tc.want)
			}

		})
	}

}
