package extractor

import (
	"context"

	"quickreel.com/core/src/model"
)

type IExtractor interface {
	ExtractImage(ctx context.Context, frameNo int) error
	ExtractClip(ctx context.Context, startFrameNo int, endFrameNo int, fps int) error
	ExtractCompressedImage(ctx context.Context, frameNo int, resolution model.Resolution) error
}

type Extractor struct {
	VideoPath  string
	OutputPath string
	Fps        int
}

func (extractor *Extractor) ExtractImage(ctx context.Context, frameNo int) error {
	input := ExtractImageInput{
		VideoPath:  extractor.VideoPath,
		Frame:      frameNo,
		OutputPath: extractor.OutputPath,
		Fps:        extractor.Fps,
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

func (extractor *Extractor) ExtractCompressedImage(ctx context.Context, frameNo int, resolution model.Resolution) error {
	input := ExtractCompressedImageInput{
		VideoPath:  extractor.VideoPath,
		Frame:      frameNo,
		OutputPath: extractor.OutputPath,
		Resolution: resolution,
	}

	return extractCompressedImage(ctx, input)
}
