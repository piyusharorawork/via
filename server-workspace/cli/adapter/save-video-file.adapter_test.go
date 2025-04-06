package adapter

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/downloader"
)

func TestSaveVideoFile(t *testing.T) {
	tt := []struct {
		name    string
		wantErr error
	}{
		{
			name: "test save video file",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			downloader := &downloader.MockDownloader{}

			ctx := myctx.GetEmptyCtx()

			err := SaveVideoFile(ctx, downloader)

			if err != nil && tc.wantErr != nil && err.Error() != tc.wantErr.Error() {
				t.Errorf("saveVideoFile() error = %v, wantErr %v", err, tc.wantErr)
			}

		})
	}

}
