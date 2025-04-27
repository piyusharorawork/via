package vidmod

import (
	"fmt"
	"testing"

	"github.com/google/uuid"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func TestConvertToMp4(t *testing.T) {
	tt := []struct {
		name         string
		videoPath    string
		wantFileName string
	}{
		{
			name:         "Test with valid video path",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/6a0bcc68-0c97-4dcd-90c6-ca4b383513f7/big_buck_bunny.webm",
			wantFileName: "big-buck-bunny.mp4",
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
			input := ConvertToMp4Input{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}
			err = convertToMp4(ctx, input)
			if err != nil {
				t.Errorf("Error: %v", err)
			}
			exists := util.IsFileExists(outputPath)

			if !exists {
				t.Errorf("File not found at %s", outputPath)
			}

			defer util.RemoveFile(outputPath)

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)

			eq, err := util.AreFilesEqual(wantFilePath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare images: %v", err)
			}

			if !eq {
				t.Fatalf("files are not equal")
			}

		})
	}

}

func TestMuteVideo(t *testing.T) {
	tt := []struct {
		name         string
		videoPath    string
		wantFileName string
	}{
		{
			name:         "Test with valid video path",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/c484f88d-0eec-4cf9-8d5f-b9d4b2f304b9/big-buck-bunny-480p-30sec-24fps.mp4",
			wantFileName: "big-buck-bunny-muted.mp4",
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
			input := MuteVideoInput{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}
			err = muteVideo(ctx, input)
			if err != nil {
				t.Errorf("Error: %v", err)
			}
			exists := util.IsFileExists(outputPath)

			if !exists {
				t.Errorf("File not found at %s", outputPath)
			}

			defer util.RemoveFile(outputPath)

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)

			eq, err := util.AreFilesEqual(wantFilePath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare images: %v", err)
			}

			if !eq {
				t.Fatalf("files are not equal")
			}

		})
	}
}

func TestCompressVideo(t *testing.T) {
	tt := []struct {
		name         string
		videoPath    string
		resolution   model.Resolution
		wantFileName string
	}{
		{
			name:         "Test with valid video path",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/5423a55b-8455-44b0-a286-b9cca68bc8a1/hotel-highlight-reel-original.mp4",
			resolution:   model.EXTREMELY_LOW_SD_240p,
			wantFileName: "hotel-highlight-reel-original-240p.mp4",
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

			modifier := &VideoModifier{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}

			err = modifier.CompressVideo(ctx, tc.resolution)

			if err != nil {
				t.Errorf("Error: %v", err)
			}
			exists := util.IsFileExists(outputPath)

			if !exists {
				t.Errorf("File not found at %s", outputPath)
			}

			defer util.RemoveFile(outputPath)

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)

			eq, err := util.AreFilesEqual(wantFilePath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare images: %v", err)
			}

			if !eq {
				t.Fatalf("files are not equal")
			}

		})
	}
}

func TestKeyFrameEncode(t *testing.T) {
	tt := []struct {
		name         string
		videoPath    string
		wantFileName string
	}{
		{
			name:         "Test with valid video path",
			videoPath:    "https://test-v1.blr1.digitaloceanspaces.com/temp/c0e11e4f-d31a-40d2-884f-3b8968b59cdc/video.mp4",
			wantFileName: "key-frame-encoded.mp4",
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
			input := KeyFrameEncodeInput{
				VideoPath:  tc.videoPath,
				OutputPath: outputPath,
			}
			err = keyframeEncode(ctx, input)
			if err != nil {
				t.Errorf("Error: %v", err)
			}
			exists := util.IsFileExists(outputPath)

			if !exists {
				t.Errorf("File not found at %s", outputPath)
			}

			defer util.RemoveFile(outputPath)

			testSamplesDirPath := ctx.Value(model.TestSamplesDirPath).(string)
			wantFilePath := fmt.Sprintf("%s/%s", testSamplesDirPath, tc.wantFileName)

			eq, err := util.AreFilesEqual(wantFilePath, outputPath)

			if err != nil {
				t.Fatalf("failed to compare images: %v", err)
			}

			if !eq {
				t.Fatalf("files are not equal")
			}

		})
	}
}
