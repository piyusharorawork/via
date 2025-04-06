package vidmod

import (
	"context"
	"errors"
	"os/exec"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type MuteVideoInput struct {
	VideoPath  string
	OutputPath string
}

func muteVideo(ctx context.Context, input MuteVideoInput) error {
	ffmpegPath, ok := ctx.Value(model.FFMpegPath).(string)

	if !ok {
		return errors.New(NO_FFMPEG_PATH_ERROR)
	}

	cmd := exec.Command(ffmpegPath, "-i", input.VideoPath, "-an", "-vcodec", "copy", input.OutputPath)
	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
