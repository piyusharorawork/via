package extractor

import (
	"fmt"
	"testing"

	"quickreel.com/core/clipinfo"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func TestExtractImage(t *testing.T) {
	tt := []struct {
		name        string
		videoPath   string
		frameNo     int
		wantImgName string
	}{
		{
			name:        "valid input 91",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/82fcafac-037f-46fb-be53-0da347e10074/10-counter.mp4",
			frameNo:     91,
			wantImgName: "extract-frame-91.png",
		},
		{
			name:        "valid input 128",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/c0e11e4f-d31a-40d2-884f-3b8968b59cdc/video.mp4",
			frameNo:     128,
			wantImgName: "extract-frame-128.png",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/output.png", tempDirPath)

			extractor := Extractor{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}

			err = extractor.ExtractImage(ctx, tc.frameNo)

			if err != nil {
				t.Fatalf("failed to extract image: %v", err)
			}

			if !util.IsFileExists(outputPath) {
				t.Fatalf("output file does not exist: %s", outputPath)
			}

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)

			wantImgPath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantImgName)

			eq, err := util.CheckImagesEqual(wantImgPath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare images: %v", err)
			}

			if !eq {
				t.Fatalf("images are not equal")
			}
		})
	}
}

func TestExtractClip(t *testing.T) {
	tt := []struct {
		name         string
		videoPath    string
		startFrameNo int
		endFrameNo   int
		fps          int
	}{
		{
			name:         "1 sec clip : 91 to 151",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/987269eb-2cf1-4d50-a889-ca421a705fe9/10-counter.mp4",
			startFrameNo: 91,
			endFrameNo:   151,
			fps:          30,
		},
		{
			name:         "clip : 75 to 106",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/effbb04d-b2d0-4096-a6df-244f8d5d1dff/5-sec.mp4",
			startFrameNo: 75,
			endFrameNo:   106,
			fps:          25,
		},
		{
			name:         "clip: 327 to 343",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/061af72c-5ecf-42e7-836e-59f8925cd49e/hotel-highlight-reel-hotel-highlight-reel-540p.mp4",
			startFrameNo: 327,
			endFrameNo:   343,
			fps:          30,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/output.mp4", tempDirPath)

			extractor := Extractor{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}

			err = extractor.ExtractClip(ctx, tc.startFrameNo, tc.endFrameNo, tc.fps)

			if err != nil {
				t.Fatalf("failed to extract image: %v", err)
			}

			if !util.IsFileExists(outputPath) {
				t.Fatalf("output file does not exist: %s", outputPath)
			}

			wantFrameCount := tc.endFrameNo - tc.startFrameNo + 1
			info := clipinfo.ClipInfo{
				VideoPath: outputPath,
			}

			gotFrameCount, err := info.GetFrameCount(ctx)

			if err != nil {
				t.Fatalf("failed to get frame count: %v", err)
			}

			if gotFrameCount != wantFrameCount {
				t.Fatalf("frame count is not equal")
			}

			util.RemoveFile(outputPath)
		})
	}

}
