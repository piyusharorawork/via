package extractor

import (
	"fmt"
	"testing"

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
