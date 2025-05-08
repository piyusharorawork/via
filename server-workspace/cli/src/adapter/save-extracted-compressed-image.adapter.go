package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/src/extractor"
	"quickreel.com/core/src/model"
)

func SaveCompressedExtractedImage(ctx context.Context, imgExtractor extractor.IExtractor, frameNo int, resolutionStr string, writer io.Writer) {
	resolution, valid := model.ParseResolution(resolutionStr)

	if !valid {
		panic("resolution not found")
	}

	err := imgExtractor.ExtractCompressedImage(ctx, frameNo, resolution)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(writer, "Image saved")
}
