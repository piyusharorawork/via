package extractor

import (
	"context"
	"fmt"
	"os/exec"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/util"
)

type ExtractImageInput struct {
	VideoPath  string
	Frame      int // frame number starts from 0
	OutputPath string
	Fps        int // Int might not be correct
}

func extractImage(ctx context.Context, input ExtractImageInput) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)
	if err != nil {
		return err
	}

	frameDuration := 1.0 / float64(input.Fps)
	seconds := float64(input.Frame)*frameDuration - (frameDuration / 2)
	if seconds < 0 {
		seconds = 0
	}
	timestamp := fmt.Sprintf("%.6f", seconds)

	cmd := exec.Command(
		ffmpegPath, "-y",
		"-i", input.VideoPath, // load video first
		"-ss", timestamp, // precise seek
		"-frames:v", "1", // capture 1 frame
		input.OutputPath,
	)

	fmt.Println(cmd.String())

	_, err = util.RunCommand(cmd)
	if err != nil {
		return err
	}

	return nil
}
