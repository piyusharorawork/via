package templatestore

import (
	"testing"

	storemodels "quick-reel.com/store/store-models"
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
			err = templateStore.Clean(ctx)

			if err != nil {
				t.Fatalf("failed to clean templates")
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

func TestListTemplates(t *testing.T) {
	tt := []struct {
		name      string
		wantErr   error
		seedData  []*storemodels.Template
		wantCount int
	}{
		{
			name:      "list templates",
			wantErr:   nil,
			wantCount: 0,
		},
		{
			name:    "list 2 templates",
			wantErr: nil,
			seedData: []*storemodels.Template{
				{
					Id:         "1",
					Name:       "template1",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfo: storemodels.ClipInfo{
						Id:          "1",
						Fps:         30,
						FrameCount:  100,
						FrameWidth:  1920,
						FrameHeight: 1080,
					},
					CreatedAt: "2023-01-01T00:00:00Z",
					UpdatedAt: "2023-01-01T00:00:00Z",
				},
				{
					Id:         "2",
					Name:       "template2",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfo: storemodels.ClipInfo{
						Id:          "1",
						Fps:         30,
						FrameCount:  100,
						FrameWidth:  1920,
						FrameHeight: 1080,
					},
					CreatedAt: "2023-01-01T00:00:00Z",
					UpdatedAt: "2023-01-01T00:00:00Z",
				},
			},
			wantCount: 2,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			templateStore := TemplateStore{}
			err = templateStore.Clean(ctx)

			if err != nil {
				t.Fatalf("failed to clean templates")
			}

			if tc.seedData != nil {
				for _, template := range tc.seedData {
					_, err := templateStore.Save(ctx, SaveTemplateInput{
						Name:       template.Name,
						WebsiteUrl: template.WebsiteUrl,
						VideoUrl:   template.VideoUrl,
						AudioUrl:   template.AudioUrl,
						ClipInfoId: template.ClipInfo.Id,
					})

					if err != nil {
						t.Fatalf("failed to save template")
					}
				}
			}

			result, err := templateStore.List(ctx)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("ListTemplates() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && len(result) != tc.wantCount {
				t.Fatalf("result count is not equal")
			}

		})

	}
}
