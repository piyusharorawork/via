package example

import (
	"context"

	"quickreel.com/core/vidmod"
)

func ConvertWebmExample(ctx context.Context) {

	err := vidmod.ConvertWebm(vidmod.ConvertWebmInput{
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/10-counter.webm",
	})

	if err != nil {
		panic(err)
	}

}
