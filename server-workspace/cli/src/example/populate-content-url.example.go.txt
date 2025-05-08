package example

import (
	"context"

	"github.com/schollz/progressbar/v3"
	"quickreel.com/core/clipinfo"
	"quickreel.com/core/workflow"
)

func PopulateContentUrlExample(ctx context.Context) {

	layers := getLayers()

	videoPath := "https://test-v1.blr1.digitaloceanspaces.com/temp/b2293974-71d9-4e32-8a03-5f05d00dfb66-output.mp4"

	info := clipinfo.ClipInfo{
		VideoPath: videoPath,
	}

	fps, err := info.GetFPS()

	if err != nil {
		panic(err)
	}

	frameCount, err := info.GetFrameCount()

	if err != nil {
		panic(err)
	}

	bar := progressbar.Default(100)

	input := workflow.PopulateContentUrlInput{
		Layers:     layers,
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/b2293974-71d9-4e32-8a03-5f05d00dfb66-output.mp4",
		Fps:        fps,
		FrameCount: frameCount,
		Callback: func(progress int) {
			bar.Set(progress)
		},
	}

	err = workflow.PopulateContentUrl(ctx, input)

	if err != nil {
		panic(err)
	}

}
