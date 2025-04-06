package vidmod

import (
	"context"
	"errors"
	"os/exec"
	"strconv"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ResizeVideoInput struct {
	VideoPath  string
	Resolution model.Resolution
	OutputPath string
}

func ResizeVideo(ctx context.Context, input ResizeVideoInput) error {
	ffmpegPath, ok := ctx.Value(model.FFMpegPath).(string)

	if !ok {
		return errors.New(NO_FFMPEG_PATH_ERROR)
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
