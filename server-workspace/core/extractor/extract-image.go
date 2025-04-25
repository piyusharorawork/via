package extractor

import (
	"context"
	"fmt"
	"os/exec"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ExtractImageInput struct {
	VideoPath  string
	Frame      int
	OutputPath string
}

func extractImage(ctx context.Context, input ExtractImageInput) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)

	if err != nil {
		return err
	}

	cmd := exec.Command(
		ffmpegPath, "-y", "-i", input.VideoPath,
		"-vf", fmt.Sprintf("select='eq(n\\,%d)'", input.Frame-1),
		"-vsync", "0", "-frames:v", "1", input.OutputPath,
	)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
