package vidmod

import (
	"context"
	"os/exec"
	"strconv"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/util"
)

type ResizeVideoInput struct {
	VideoPath  string
	Resolution model.Resolution
	OutputPath string
}

func ResizeVideo(ctx context.Context, input ResizeVideoInput) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)

	if err != nil {
		return err
	}

	dimensions, err := model.GetDimensions(input.Resolution)
	if err != nil {
		return err
	}

	cmd := exec.Command(ffmpegPath, "-y", "-i", input.VideoPath, "-vf", "scale="+strconv.Itoa(dimensions.Width)+":"+strconv.Itoa(dimensions.Height), "-c:a", "copy", input.OutputPath)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
