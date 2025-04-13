package adapter

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/downloader"
)

func TestSaveAudioFile(t *testing.T) {
	tt := []struct {
		name    string
		wantErr error
	}{
		{
			name: "success",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			downloader := &downloader.MockDownloader{}

			ctx := myctx.GetEmptyCtx()

			err := SaveAudioFile(ctx, downloader)

			if err != nil && tc.wantErr != nil && err.Error() != tc.wantErr.Error() {
				t.Errorf("saveAudioFile() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && downloader.DownloadAudioCalled == false {
				t.Errorf("saveAudioFile() error = %v, wantErr %v", err, tc.wantErr)
			}

		})
	}

}
