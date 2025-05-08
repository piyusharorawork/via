package adapter

import (
	"context"

	"quickreel.com/core/src/extractor"
)

func ExtractClip(ctx context.Context, extractor extractor.IExtractor, startFrameNo int, endFrameNo int, fps int) {
	err := extractor.ExtractClip(ctx, startFrameNo, endFrameNo, fps)

	if err != nil {
		panic(err)
	}

}
