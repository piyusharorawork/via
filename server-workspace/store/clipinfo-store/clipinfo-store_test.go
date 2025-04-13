package clipinfostore

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

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
