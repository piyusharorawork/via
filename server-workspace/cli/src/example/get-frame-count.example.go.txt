package example

import (
	"context"

	"quickreel.com/core/clipinfo"
)

func GetFrameCountExample(ctx context.Context) {
	info := clipinfo.ClipInfo{
		VideoPath: "https://test-v1.blr1.digitaloceanspaces.com/temp/e262fcec-396a-4857-8546-c6c2f0e49e96.webm",
	}
	frameCount, err := info.GetFrameCount()

	if err != nil {
		panic(err)
	}

	println(frameCount)
}
