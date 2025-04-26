package templateservice

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestCreateTemplate(t *testing.T) {
	tt := []struct {
		name           string
		wantTemplateId string
		wantErr        error
	}{
		{
			name:           "successfully create template",
			wantTemplateId: "",
			wantErr:        nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			templateService := &TemplateService{
				MediaCreator: &MockMediaCreator{
					VideoUrl: "https://url.mp4",
					AudioUrl: "https://url.mp3",
				},
			}
			ctx := myctx.GetEmptyCtx()
			templateId, err := templateService.CreateTemplate(ctx, CreateTemplateInput{})

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("createTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}
			if err == nil && templateId != tc.wantTemplateId {
				t.Fatalf("templateId is not equal")
			}

		})
	}

}
