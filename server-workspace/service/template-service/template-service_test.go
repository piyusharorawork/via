package templateservice

import (
	"reflect"
	"testing"

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
		wantTemplates []TemplateLite
		wantErr       error
	}{
		{
			name: "successfully fetch all templates",
			wantTemplates: []TemplateLite{
				{
					Id:   "1",
					Name: "template1",
				},
				{
					Id:   "2",
					Name: "template2",
				},
			},
			wantErr: nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			templateService := &TemplateService{
				TemplateStore: &templatestore.MockTemplateStore{
					ListResult: []*storemodels.Template{
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
				},
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
