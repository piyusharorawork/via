package extractor

import (
	"context"
	"fmt"
	"os/exec"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ExtractCompressedImageInput struct {
	VideoPath  string
	Frame      int
	OutputPath string
	Resolution model.Resolution
}

func extractCompressedImage(ctx context.Context, input ExtractCompressedImageInput) error {
	ffmpegPath, ok := ctx.Value(model.FFMpegPath).(string)
	if !ok {
		return fmt.Errorf("ffmpeg path not found in context")
	}

	dimensions, err := model.GetDimensions(input.Resolution)

	if err != nil {
		return err
	}

	// Build the video filter string
	vf := fmt.Sprintf("select='eq(n\\,%d)'", input.Frame-1)
	vf = fmt.Sprintf("%s,scale=%d:%d", vf, dimensions.Width, dimensions.Height)

	cmd := exec.Command(
		ffmpegPath, "-y", "-i", input.VideoPath,
		"-vf", vf,
		"-vsync", "0", "-frames:v", "1", input.OutputPath,
	)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
