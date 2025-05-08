package adapter

import (
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
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			templateService := &templateservice.MockTemplateService{}
			RemoveTemplate(ctx, "1", templateService)

			if !templateService.RemoveCalled {
				t.Fatalf("RemoveTemplate() RemoveCalled = %v, want %v", templateService.RemoveCalled, true)
			}

		})
	}
}
