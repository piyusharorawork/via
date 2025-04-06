package vidmod

import (
	"fmt"
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func TestConvertToMp4(t *testing.T) {
	tt := []struct {
		name           string
		videoPath      string
		outputFileName string
		wantFileName   string
	}{
		{
			name:           "Test with valid video path",
			videoPath:      "https://test-v1.blr1.digitaloceanspaces.com/temp/6a0bcc68-0c97-4dcd-90c6-ca4b383513f7/big_buck_bunny.webm",
			outputFileName: "output.mp4",
			wantFileName:   "big-buck-bunny.mp4",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatal(err)
			}
			tempDirPath := ctx.Value(model.TempDirPath).(string)
			outputPath := fmt.Sprintf("%s/%s", tempDirPath, tc.outputFileName)
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
