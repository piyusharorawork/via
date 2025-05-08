package vidmod

import (
	"context"
	"os/exec"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/util"
)

type KeyFrameEncodeInput struct {
	VideoPath  string
	OutputPath string
}

func keyframeEncode(ctx context.Context, input KeyFrameEncodeInput) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)

	if err != nil {
		return err
	}

	cmd := exec.Command(ffmpegPath, "-i", input.VideoPath, "-g", "1", "-keyint_min", "1", "-sc_threshold", "0", "-x264opts", "keyint=1", input.OutputPath)
	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
