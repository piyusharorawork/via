package downloader

import (
	"context"
	"fmt"
	"testing"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)



func TestDownloadVideo(t *testing.T) {
	tt := []struct {
		name       string
		websiteUrl string
		outputDirPath string
		outputFileName string
		wantErr 	error
	}{
		{
			name:       "download 3 sec video",
			websiteUrl: "https://www.youtube.com/shorts/s-MsZo02dos",
			outputDirPath: "./temp",
			outputFileName: "3-sec.mp4",
		},
		
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			downloader := &Downloader{
				WebsiteUrl:   tc.websiteUrl,
				OutputDirPath: tc.outputDirPath,
				OutputFileName: tc.outputFileName,
				Callback: func(percentage int) {},
			}

			ctx := getTestCtx()

			err := downloader.DownloadVideo(ctx)

			if err != nil && tc.wantErr != nil && err.Error() != tc.wantErr.Error() {
				t.Errorf("downloadVideo() error = %v, wantErr %v", err, tc.wantErr)
				return
			}	

			outFilePath := fmt.Sprintf("%s/%s", tc.outputDirPath, tc.outputFileName)

			if err == nil && !util.IsFileExists(outFilePath) {
				t.Errorf("no file found at %s", outFilePath)
				return
			}

			util.RemoveFile(outFilePath)
		})
	}
}


func getTestCtx() context.Context {
	ctx := context.Background()
	ctx = context.WithValue(ctx, model.YtDlpCliPath, "/Users/piyusharora/projects/via/bin/yt-dlp") // TODO use relative path
	return ctx
}