package templateservice

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/downloader"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

func TestCreateVideoUrl(t *testing.T) {
	tt := []struct {
		name    string
		wantUrl string
		wantErr error
	}{
		{
			name:    "create video url",
			wantUrl: "https://url.mp4",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			downloader := &downloader.MockDownloader{}
			uploader := &uploader.MockUploader{
				Url: tc.wantUrl,
			}

			url, err := createVideoUrl(ctx, downloader, uploader)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("createVideoUrl() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && url != tc.wantUrl {
				t.Fatalf("url is not equal")
			}

		})

	}
}
