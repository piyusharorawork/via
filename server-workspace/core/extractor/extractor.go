package extractor

import "context"

type IExtractor interface {
	ExtractImage(ctx context.Context, frameNo int) error
}

type Extractor struct {
	VideoPath  string
	OutputPath string
}

func (extractor *Extractor) ExtractImage(ctx context.Context, frameNo int) error {
	input := ExtractImageInput{
		VideoPath:  extractor.VideoPath,
		Frame:      frameNo,
		OutputPath: extractor.OutputPath,
	}

	return extractImage(ctx, input)

}
