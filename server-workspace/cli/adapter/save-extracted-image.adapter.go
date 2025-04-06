package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/extractor"
)

func SaveExtractedImage(ctx context.Context, imgExtractor extractor.IExtractor, frameNo int, writer io.Writer) {
	err := imgExtractor.ExtractImage(ctx, frameNo)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(writer, "Image saved")
}
