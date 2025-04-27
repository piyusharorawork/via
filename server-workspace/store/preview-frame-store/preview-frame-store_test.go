package previewframestore

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

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

			previewFrameStore.Remove(ctx, id)

		})

	}
}
