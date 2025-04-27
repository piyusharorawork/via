package clipinfostore

import (
	"reflect"
	"testing"

	storemodels "quick-reel.com/store/store-models"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestGetClipInfo(t *testing.T) {
	tt := []struct {
		name     string
		id       string
		seedData []*storemodels.ClipInfo
		wantErr  error
		want     *storemodels.ClipInfo
	}{
		{
			name: "get valid clipinfo",
			id:   "1",
			seedData: []*storemodels.ClipInfo{
				{
					Id:          "1",
					Fps:         30,
					FrameCount:  100,
					FrameWidth:  1920,
					FrameHeight: 1080,
					CreatedAt:   "2023-01-01T00:00:00Z",
					UpdatedAt:   "2023-01-01T00:00:00Z",
				},
			},
			wantErr: nil,
			want:    &storemodels.ClipInfo{Id: "1", Fps: 30, FrameCount: 100, FrameWidth: 1920, FrameHeight: 1080, CreatedAt: "2023-01-01T00:00:00Z", UpdatedAt: "2023-01-01T00:00:00Z"},
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			clipInfoStore := ClipInfoStore{}
			err = clipInfoStore.Clean(ctx)

			if err != nil {
				t.Fatalf("failed to clean clipinfo")
			}

			err = clipInfoStore.Seed(ctx, tc.seedData)

			if err != nil {
				t.Fatalf("failed to seed clipinfo")
			}

			result, err := clipInfoStore.Get(ctx, tc.id)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("GetClipInfo() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && !reflect.DeepEqual(result, tc.want) {
				t.Fatalf("result is not equal")
			}

		})

	}
}

func TestSaveClipInfo(t *testing.T) {
	tt := []struct {
		name        string
		fps         int
		frameCount  int
		frameWidth  int
		frameHeight int
		wantErr     error
	}{
		{
			name:        "save valid clipinfo",
			fps:         30,
			frameCount:  100,
			frameWidth:  1920,
			frameHeight: 1080,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			clipInfoStore := ClipInfoStore{}
			input := SaveClipInfoInput{
				Fps:         tc.fps,
				FrameCount:  tc.frameCount,
				FrameWidth:  tc.frameWidth,
				FrameHeight: tc.frameHeight,
			}

			id, err := clipInfoStore.Save(ctx, input)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("SaveClipInfo() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && id == "" {
				t.Fatalf("id is empty")
			}

			clipInfoStore.Remove(ctx, id)

		})

	}

}
