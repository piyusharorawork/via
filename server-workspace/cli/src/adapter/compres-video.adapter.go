package adapter

import (
	"context"

	"quickreel.com/core/src/model"
	"quickreel.com/core/src/vidmod"
)

func CompressVideo(ctx context.Context, modifier vidmod.IVideoModifier, resolutionStr string) {
	resolution, ok := model.ParseResolution(resolutionStr)

	if !ok {
		panic("resolution not found")
	}

	err := modifier.CompressVideo(ctx, resolution)

	if err != nil {
		panic(err)
	}
}
