package templatestore

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestSaveTemplate(t *testing.T) {
	tt := []struct {
		name       string
		websiteUrl string
		videoUrl   string
		audioUrl   string
		clipInfoId string
		wantErr    error
	}{
		{
			name:       "save valid template",
			websiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
			videoUrl:   "https://url.mp4",
			audioUrl:   "https://url.mp3",
			clipInfoId: "1",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			templateStore := TemplateStore{}
			input := SaveTemplateInput{
				Name:       tc.name,
				WebsiteUrl: tc.websiteUrl,
				VideoUrl:   tc.videoUrl,
				AudioUrl:   tc.audioUrl,
				ClipInfoId: tc.clipInfoId,
			}

			id, err := templateStore.Save(ctx, input)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("SaveTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && id == "" {
				t.Fatalf("id is empty")
			}

			templateStore.Remove(ctx, id)

		})

	}
}
