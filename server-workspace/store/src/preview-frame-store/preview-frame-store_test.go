package previewframestore

import (
	"reflect"
	"testing"

	storemodels "quick-reel.com/store/src/store-models"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/util"
)

func TestFetchPreviewFrames(t *testing.T) {
	tt := []struct {
		name       string
		templateId string
		seedData   []*storemodels.PreviewFrame
		wantErr    error
		want       []*storemodels.PreviewFrame
	}{
		{
			name:       "get valid preview frame",
			templateId: "50",
			seedData: []*storemodels.PreviewFrame{
				{
					Id:         "1",
					FrameNo:    100,
					ImageUrl:   "https://url.png",
					TemplateId: "50",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
				{
					Id:         "2",
					FrameNo:    120,
					ImageUrl:   "https://url.png",
					TemplateId: "51",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
			wantErr: nil,
			want: []*storemodels.PreviewFrame{
				{
					Id:         "1",
					FrameNo:    100,
					ImageUrl:   "https://url.png",
					TemplateId: "50",
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

			previewFrameStore := PreviewFrameStore{}
			err = previewFrameStore.Clean(ctx)

			if err != nil {
				t.Fatalf("failed to clean preview frame")
			}

			err = previewFrameStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed preview frame")
			}

			result, err := previewFrameStore.Fetch(ctx, tc.templateId)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("GetPreviewFrame() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !reflect.DeepEqual(result, tc.want) {
				t.Fatalf("result is not equal")
			}

		})

	}
}

func TestSavePreviewFrame(t *testing.T) {
	tt := []struct {
		name     string
		frameNo  int
		imageUrl string
		wantErr  error
	}{
		{
			name:     "save preview frame",
			frameNo:  100,
			imageUrl: "https://url.mp4",
			wantErr:  nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			previewFrameStore := PreviewFrameStore{}
			input := SavePreviewFrameInput{
				FrameNo:  tc.frameNo,
				ImageUrl: tc.imageUrl,
			}

			id, err := previewFrameStore.Save(ctx, input)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("SavePreviewFrame() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && id == "" {
				t.Fatalf("id is empty")
			}

		})

	}
}

func TestRemoveMany(t *testing.T) {
	tt := []struct {
		name       string
		seedData   []*storemodels.PreviewFrame
		templateId string
		wantErr    error
	}{
		{
			name: "remove preview frame",
			seedData: []*storemodels.PreviewFrame{
				{
					Id:         "1",
					FrameNo:    100,
					ImageUrl:   "https://url.png",
					TemplateId: "1",
					CreatedAt:  "2023-01-01T00:00:00Z",
					UpdatedAt:  "2023-01-01T00:00:00Z",
				},
			},
			templateId: "1",
			wantErr:    nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			previewFrameStore := PreviewFrameStore{}

			err = previewFrameStore.Clean(ctx)

			if err != nil {
				t.Fatalf("failed to clean preview frame")
			}

			err = previewFrameStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed preview frame")
			}

			err = previewFrameStore.RemoveMany(ctx, tc.templateId)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("RemoveMany() error = %v, wantErr %v", err, tc.wantErr)
			}

		})

	}
}
