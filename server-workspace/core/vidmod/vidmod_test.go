package vidmod

import (
	"context"
	"testing"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func TestConvertToMp4(t *testing.T) {
	tt := []struct {
		name     string
		videoPath string
		outputPath string
		
		
	}{
		{
			name:     "Test with valid video path",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-9ff4d680-647c-4f33-b6a8-1aff279ea39a/81242eec-fe8e-4fde-8eeb-431f8b0b61d7.webm",
			outputPath: "/Users/piyusharora/projects/via/server-workspace/core/vidmod/temp/converted.mp4", // TODO use relative path
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := getTestCtx()
			input := ConvertToMp4Input{
				VideoPath: tc.videoPath,
				OutputPath: tc.outputPath,
			}
			err := convertToMp4(ctx, input)
			if err != nil {
				t.Errorf("Error: %v", err)
			}
			 exists := util.IsFileExists(tc.outputPath) 

			if !exists {
				t.Errorf("File not found at %s", tc.outputPath)
			}
			util.RemoveFile(tc.outputPath)
		})
	}

}

func getTestCtx() context.Context {
	ctx := context.Background()
	ctx = context.WithValue(ctx, model.FFMpegPath, "/Users/piyusharora/projects/via/bin/ffmpeg") // TODO use relative path
	return ctx
}