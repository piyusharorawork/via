package vidmod

import (
	"context"
	"os/exec"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type MuteVideoInput struct {
	VideoPath  string
	OutputPath string
}

func muteVideo(ctx context.Context, input MuteVideoInput) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)

	if err != nil {
		return err
	}

	cmd := exec.Command(ffmpegPath, "-i", input.VideoPath, "-an", "-vcodec", "copy", input.OutputPath)
	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
