package example

import (
	"context"
	"fmt"

	"quickreel.com/core/clipinfo"
)

func AnalyseVideoExample(ctx context.Context) {
	videoUrl := "https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.webm"

	info := clipinfo.ClipInfo{
		VideoPath: videoUrl,
	}

	fps, err := info.GetFPS()

	if err != nil {
		panic(err)
	}

	fmt.Printf("fps: %d\n", fps)

	frameCount, err := info.GetFrameCount()

	if err != nil {
		panic(err)
	}
	fmt.Printf("frameCount: %d\n", frameCount)

	frameSize, err := info.GetFrameSize()

	if err != nil {
		panic(err)
	}
	fmt.Printf("frameSize: %d\n", frameSize)

}
