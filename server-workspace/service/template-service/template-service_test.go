package templateservice

import (
	"reflect"
	"testing"

	servicemodels "quick-reel.com/service/service-models"
	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	storemodels "quick-reel.com/store/store-models"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/core/clipinfo"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/extractor"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

func TestGetTemplate(t *testing.T) {
	tt := []struct {
		name          string
		id            string
		templateStore templatestore.ITemplateStore
		clipInfoStore clipinfostore.IClipInfoStore
		previewStore  previewframestore.IPreviewFrameStore
		want          *servicemodels.TemplateFull
		wantErr       error
	}{
		{
			name: "get valid template",
			id:   "1",
			templateStore: &templatestore.MockTemplateStore{
				GetResult: &storemodels.Template{
					Id:         "1",
					Name:       "template1",
					WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",
					VideoUrl:   "https://url.mp4",
					AudioUrl:   "https://url.mp3",
					ClipInfoId: "1",
				},
			},
			clipInfoStore: &clipinfostore.MockClipInfoStore{
				GetResult: &storemodels.ClipInfo{
					Fps:         30,
					FrameCount:  200,
					FrameWidth:  1920,
					FrameHeight: 1080,
				},
			},
			previewStore: &previewframestore.MockPreviewFrameStore{
				FetchResult: []*storemodels.PreviewFrame{
					{
						Id:         "1",
						FrameNo:    150,
						ImageUrl:   "https://url.png",
						TemplateId: "1",
						CreatedAt:  "2023-01-01T00:00:00Z",
						UpdatedAt:  "2023-01-01T00:00:00Z",
					},
					{
						Id:         "2",
						FrameNo:    120,
						ImageUrl:   "https://url.png",
						TemplateId: "1",
						CreatedAt:  "2023-01-01T00:00:00Z",
						UpdatedAt:  "2023-01-01T00:00:00Z",
					},
				},
			},
			want: &servicemodels.TemplateFull{
				Id:         "1",
				Name:       "template1",
				VideoUrl:   "https://url.mp4",
				AudioUrl:   "https://url.mp3",
				WebsiteUrl: "https://www.youtube.com/shorts/hK3sHK2_osE",

				ClipInfo: &servicemodels.ClipInfoFull{
					Fps:         30,
					FrameCount:  200,
					FrameWidth:  1920,
					FrameHeight: 1080,
				},
				PreviewFrames: []*servicemodels.PreviewFrame{
					{
						FrameNo:    150,
						PreviewUrl: "https://url.png",
					},
					{
						FrameNo:    120,
						PreviewUrl: "https://url.png",
					},
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

			templateService := &TemplateService{
				TemplateStore:     tc.templateStore,
				ClipInfoStore:     tc.clipInfoStore,
				PreviewFrameStore: tc.previewStore,
			}

			result, err := templateService.Get(ctx, tc.id)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("GetTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !reflect.DeepEqual(result, tc.want) {
				t.Fatalf("result is not equal")
			}

		})

	}
}

func TestCreateTemplate(t *testing.T) {
	tt := []struct {
		name           string
		wantTemplateId string
		wantErr        error
	}{
		{
			name:           "successfully create template",
			wantTemplateId: "123",
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
				ClipInfoFactory: &clipinfo.MockClipInfoFactory{
					Fps:        24,
					FrameCount: 100,
				},
				ExtractorFactory: &extractor.MockExtractorFactory{},
				UploaderFactory: &uploader.MockUploaderFactory{
					Url: "http://preview-image.png",
				},
				ClipInfoStore: &clipinfostore.MockClipInfoStore{
					SavedId: "150",
				},
				TemplateStore: &templatestore.MockTemplateStore{
					SavedId: "123",
				},
				PreviewFrameStore: &previewframestore.MockPreviewFrameStore{},
			}
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			templateId, err := templateService.Create(ctx, CreateTemplateInput{})

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("createTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}
			if err == nil && templateId != tc.wantTemplateId {
				t.Fatalf("templateId is not equal")
			}

		})
	}

}

func TestFetchAllTemplates(t *testing.T) {
	tt := []struct {
		name          string
		wantTemplates []servicemodels.TemplateLite
		wantErr       error
	}{
		{
			name: "successfully fetch all templates",
			wantTemplates: []servicemodels.TemplateLite{
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
			wantErr: nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {

			templateStore := &templatestore.MockTemplateStore{
				FetchResult: []*storemodels.Template{
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
			}

			templateService := &TemplateService{
				TemplateStore: templateStore,
			}
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			templates, err := templateService.ListAll(ctx)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("fetchAllTemplates() error = %v, wantErr %v", err, tc.wantErr)
			}
			if err == nil && !reflect.DeepEqual(templates, tc.wantTemplates) {
				t.Fatalf("templates is not equal")
			}

		})
	}

}

func TestGetPreviewCount(t *testing.T) {
	tt := []struct {
		name       string
		fps        int
		frameCount int
		want       int
	}{
		{
			name:       "57 preview count",
			fps:        30,
			frameCount: 422,
			want:       57,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			got := getPreviewCount(tc.fps, tc.frameCount)
			if got != tc.want {
				t.Fatalf("getPreviewCount() = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestGetPreviewFrameNos(t *testing.T) {
	tt := []struct {
		name       string
		fps        int
		frameCount int
		want       []int
	}{
		{
			name:       "57 preview frame nos",
			fps:        30,
			frameCount: 422,
			want: []int{
				0, 7, 15, 22, 30, 37, 45, 52, 60, 67, 75, 82, 90, 97, 105, 112, 120, 127, 135, 142, 150, 157, 165, 172, 180, 187, 195, 202, 210, 218, 225, 233, 240, 248, 255, 263, 270, 278, 285, 293, 300, 308, 315, 323, 330, 338, 345, 353, 360, 368, 375, 383, 390, 398, 405, 413, 421,
			},
		},
	}
	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			got := getPreviewFrameNos(tc.fps, tc.frameCount)
			if len(got) != len(tc.want) {
				t.Fatalf("getPreviewFrameNos() = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestRemoveTemplate(t *testing.T) {
	tt := []struct {
		name    string
		wantErr error
	}{
		{
			name:    "successfully remove template",
			wantErr: nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			templateStore := &templatestore.MockTemplateStore{}
			clipInfoStore := &clipinfostore.MockClipInfoStore{}
			previewFrameStore := &previewframestore.MockPreviewFrameStore{}

			templateService := &TemplateService{
				TemplateStore:     templateStore,
				ClipInfoStore:     clipInfoStore,
				PreviewFrameStore: previewFrameStore,
			}

			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			err = templateService.Remove(ctx, "1")

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("removeTemplate() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !templateStore.RemoveCalled {
				t.Fatalf("removeTemplate() RemoveCalled = %v, want %v", templateStore.RemoveCalled, true)
			}

			if err == nil && !clipInfoStore.RemoveCalled {
				t.Fatalf("removeTemplate() RemoveCalled = %v, want %v", clipInfoStore.RemoveCalled, true)
			}

			if err == nil && !previewFrameStore.RemoveManyCalled {
				t.Fatalf("removeTemplate() RemoveManyCalled = %v, want %v", previewFrameStore.RemoveManyCalled, true)
			}

		})
	}

}
