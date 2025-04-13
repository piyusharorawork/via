package downloader

import (
	"fmt"
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func TestDownloadVideo(t *testing.T) {
	tt := []struct {
		name         string
		websiteUrl   string
		wantFileName string
		wantErr      error
	}{
		{
			name:         "download 3 sec video",
			websiteUrl:   "https://www.youtube.com/shorts/s-MsZo02dos",
			wantFileName: "3-sec.mp4",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)

			downloader := &Downloader{
				WebsiteUrl:     tc.websiteUrl,
				OutputDirPath:  tempDirPath,
				OutputFileName: "out.mp4",
			}

			err = downloader.DownloadVideo(ctx)

			if err != nil && tc.wantErr != nil && err.Error() != tc.wantErr.Error() {
				t.Errorf("downloadVideo() error = %v, wantErr %v", err, tc.wantErr)
				return
			}

			outFilePath := fmt.Sprintf("%s/%s", tempDirPath, "out.mp4")

			if err == nil && !util.IsFileExists(outFilePath) {
				t.Errorf("no file found at %s", outFilePath)
				return
			}

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)
			eq, err := util.AreFilesEqual(wantFilePath, outFilePath)
			if err != nil {
				t.Fatalf("failed to compare files: %v", err)
			}
			if !eq {
				t.Fatalf("files are not equal")
			}

			util.RemoveFile(outFilePath)
		})
	}
}

func TestDownloadAudio(t *testing.T) {
	tt := []struct {
		name         string
		websiteUrl   string
		wantFileName string
		wantErr      error
	}{
		{
			name:         "download audio mp3",
			websiteUrl:   "https://www.youtube.com/shorts/WWq48RqzUVM",
			wantFileName: "dosa.mp3",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)

			downloader := &Downloader{
				WebsiteUrl:     tc.websiteUrl,
				OutputDirPath:  tempDirPath,
				OutputFileName: "out.mp3",
			}

			err = downloader.DownloadAudio(ctx)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("DownloadAudio() error = %v, wantErr %v", err, tc.wantErr)
			}

			outputPath := fmt.Sprintf("%s/out.mp3", tempDirPath)

			if err == nil && !util.IsFileExists(outputPath) {
				t.Errorf("no file found at %s", outputPath)
				return
			}

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)

			eq, err := util.AreFilesEqual(wantFilePath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare files: %v", err)
			}

			if !eq {
				t.Fatalf("files are not equal")
			}

			util.RemoveFile(outputPath)

		})
	}

}
