package adapter

import (
	"context"

	"quickreel.com/core/model"
	"quickreel.com/core/vidmod"
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
