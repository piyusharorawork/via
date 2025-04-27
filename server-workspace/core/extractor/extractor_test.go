package extractor

import (
	"fmt"
	"testing"

	"github.com/google/uuid"
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
		fps         int
		wantImgName string
	}{
		{
			name:        "valid input 90",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/0dbb51fa-8e8e-4ffe-95ae-f64c044529ae/e05f1a61-c92c-4366-9eef-c3b5d3fc2ab8.mp4",
			frameNo:     90,
			fps:         30,
			wantImgName: "extract-frame-90.png",
		},
		{
			name:        "valid input 24",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/b9ed84be-2c7d-4e8e-a889-8190e836c0a7/597f8c64-6fec-48b4-b8a6-da33916cb97e.mp4",
			frameNo:     24,
			fps:         25,
			wantImgName: "extract-frame-24.png",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/%s-output.png", tempDirPath, uuid.NewString())

			extractor := Extractor{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
				Fps:        tc.fps,
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
			name:         "1 sec clip : 90 to 150",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/ed771d2f-805e-4d86-a703-529d4f5baa43/c7006d76-8bf8-4cb3-9ed8-52b0a0632251.mp4",
			startFrameNo: 90,
			endFrameNo:   150,
			fps:          30,
		},
		{
			name:         "clip : 74 to 97",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/127d0a09-e8a9-4b89-9e78-438fe8fc46db/fb85ba1d-6d66-4064-adf0-3992211134b2.mp4",
			startFrameNo: 74,
			endFrameNo:   97,
			fps:          25,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/%s-output.mp4", tempDirPath, uuid.NewString())

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

func TestExtractCompressesImage(t *testing.T) {
	tt := []struct {
		name        string
		videoPath   string
		frameNo     int
		resolution  model.Resolution
		wantImgName string
	}{
		{
			name:        "valid input 90",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/b26c9be8-a2c9-4ea5-9585-7344c898abb5/561097fe-af24-4ecd-a8ba-6784dcc9321b.mp4",
			frameNo:     90,
			resolution:  model.BARE_MINIMUM_SD_90p,
			wantImgName: "extract-frame-90-90p.png",
		},
		{
			name:        "valid input 48",
			videoPath:   "https://test-v1.blr1.digitaloceanspaces.com/temp/2e9e3b00-5e60-4fed-9f5e-e9a7e3c99244/934303e6-5950-4208-874f-1fab9ce07a6a.mp4",
			frameNo:     48,
			resolution:  model.LOW_RES_HD_540p,
			wantImgName: "extract-frame-48-540p.png",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()
			if err != nil {
				t.Fatal(err)
			}

			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/%s-output.png", tempDirPath, uuid.NewString())

			extractor := Extractor{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}

			err = extractor.ExtractCompressedImage(ctx, tc.frameNo, tc.resolution)

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

			util.RemoveFile(outputPath)
		})
	}
}
