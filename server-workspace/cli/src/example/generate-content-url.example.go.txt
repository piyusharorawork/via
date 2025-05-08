package example

import (
	"context"
	"fmt"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/model"
	"quickreel.com/core/workflow"
)

func GenerateContentUrlExample(ctx context.Context) {

	videoUrl := "https://test-v1.blr1.digitaloceanspaces.com/temp/b2293974-71d9-4e32-8a03-5f05d00dfb66-output.mp4"

	inInfo := clipinfo.ClipInfo{
		VideoPath: videoUrl,
	}

	fps, err := inInfo.GetFPS()

	if err != nil {
		panic(err)
	}

	frameCount, err := inInfo.GetFrameCount()

	if err != nil {
		panic(err)
	}

	segment := model.Segment{
		Start: 1,
		End:   27,
		Content: &model.SegmentContent{
			Type: "video",
			Region: &model.Region{
				X:      0,
				Y:      0,
				Width:  1,
				Height: 1,
			},
		},
	}

	input := workflow.GenerateContentUrlInput{
		VideoPath:  videoUrl,
		Segment:    &segment,
		Fps:        fps,
		FrameCount: frameCount,
	}

	momentUrl, err := workflow.GenerateContentUrl(ctx, input)

	if err != nil {
		panic(err)
	}
	outInfo := clipinfo.ClipInfo{
		VideoPath: momentUrl,
	}

	outFps, err := outInfo.GetFPS()
	if err != nil {
		panic(err)
	}
	info := clipinfo.ClipInfo{
		VideoPath: momentUrl,
	}

	outFrameCount, err := info.GetFrameCount()
	if err != nil {
		panic(err)
	}
	fmt.Printf("momentUrl: %s\n", momentUrl)
	fmt.Printf("outFps: %d\n", outFps)
	fmt.Printf("outFrameCount: %d\n", outFrameCount)

	inFrameCount := segment.End - segment.Start + 1

	if outFrameCount != inFrameCount {
		panic("frame count mismatch")
	}

	println("success")
}
