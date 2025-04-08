package extractor

import "context"

type IExtractor interface {
	ExtractImage(ctx context.Context, frameNo int) error
	ExtractClip(ctx context.Context, startFrameNo int, endFrameNo int, fps int) error
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

func (extractor *Extractor) ExtractClip(ctx context.Context, startFrameNo int, endFrameNo int, fps int) error {
	input := ExtractClipInput{
		VideoPath:  extractor.VideoPath,
		Start:      startFrameNo,
		End:        endFrameNo,
		OutputPath: extractor.OutputPath,
		Fps:        fps,
	}

	return extractClip(ctx, input)

}
