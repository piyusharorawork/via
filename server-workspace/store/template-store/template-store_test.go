package templatestore

import (
	"reflect"
	"testing"

	storemodels "quick-reel.com/store/store-models"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestFetchTemplates(t *testing.T) {
	tt := []struct {
		name     string
		seedData []*storemodels.Template
		want     []*storemodels.Template
		wantErr  error
	}{
		{
			name:    "list templates",
			wantErr: nil,
			want:    []*storemodels.Template{},
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
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
				{
					Id:         "2",
					Name:       "template2",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
			want: []*storemodels.Template{
				{
					Id:         "1",
					Name:       "template1",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
				{
					Id:         "2",
					Name:       "template2",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
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

			err = templateStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed templates")
			}

			result, err := templateStore.Fetch(ctx)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("ListTemplates() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !reflect.DeepEqual(result, tc.want) {
				t.Fatalf("result is not equal")
			}

		})

	}
}

func TestGetTemplate(t *testing.T) {
	tt := []struct {
		name     string
		id       string
		seedData []*storemodels.Template
		wantErr  error
		want     *storemodels.Template
	}{
		{
			name:    "get valid template",
			id:      "1",
			wantErr: nil,
			seedData: []*storemodels.Template{
				{
					Id:         "1",
					Name:       "template1",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
			want: &storemodels.Template{
				Id:         "1",
				Name:       "template1",
				WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
				VideoUrl:   "https://url.mp4",
				AudioUrl:   "https://url.mp3",
				ClipInfoId: "1",
				CreatedAt:  "2023-01-01T00:00:00Z",
				UpdatedAt:  "2023-01-01T00:00:00Z",
			},
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

			err = templateStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed templates")
			}

			result, err := templateStore.Get(ctx, tc.id)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("GetTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !reflect.DeepEqual(result, tc.want) {
				t.Fatalf("result is not equal")
			}

		})

	}
}

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

			result, err := templateStore.Get(ctx, id)
			if err != nil {
				t.Fatalf("failed to get template")
			}

			if result.Name != tc.name || result.Id != id {
				t.Fatalf("template is not equal")
			}

		})

	}
}

func TestRemoveTemplate(t *testing.T) {
	tt := []struct {
		name        string
		id          string
		wantErr     error
		seedData    []*storemodels.Template
		wantRemoved bool
	}{
		{
			name:    "remove valid template",
			id:      "1",
			wantErr: nil,
			seedData: []*storemodels.Template{
				{
					Id:         "1",
					Name:       "template1",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
			wantRemoved: true,
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

			err = templateStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed templates")
			}

			err = templateStore.Remove(ctx, tc.id)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("RemoveTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}

		})

	}
}
