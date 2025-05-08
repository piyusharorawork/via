package handler

import (
	"bytes"
	"testing"

	templateservice "quick-reel.com/service/src/template-service"
	myctx "quickreel.com/core/src/ctx"
)

func TestRemoveTemplate(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "success",
			want: "ok",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {

			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatal(err)
			}

			templateService := &templateservice.MockTemplateService{}

			writer := &MockWriter{
				Body: &bytes.Buffer{},
			}

			removeTemplate(ctx, "1", templateService, writer)

			if writer.Body.String() != tc.want {
				t.Errorf("removeTemplate() = %v, want %v", writer.Body.String(), tc.want)
			}
		})
	}

}
