package example

import (
	"context"
	"fmt"

	"quickreel.com/core/clipinfo"
)

func AnalyseVideoExample(ctx context.Context) {
	videoUrl := "https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.webm"

	fps, err := clipinfo.GetFPS(videoUrl)

	if err != nil {
		panic(err)
	}

	fmt.Printf("fps: %d\n", fps)

	frameCount, err := clipinfo.GetFrameCount(videoUrl)

	if err != nil {
		panic(err)
	}
	fmt.Printf("frameCount: %d\n", frameCount)

	frameSize, err := clipinfo.GetFrameSize(videoUrl)

	if err != nil {
		panic(err)
	}
	fmt.Printf("frameSize: %d\n", frameSize)

}
