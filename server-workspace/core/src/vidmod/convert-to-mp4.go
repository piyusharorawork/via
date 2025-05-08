package vidmod

import (
	"context"
	"os/exec"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/util"
)

type ConvertToMp4Input struct {
	VideoPath  string
	OutputPath string
}

// TODO common constants
const (
	NO_FFMPEG_PATH_ERROR = "no ffmpeg path provided"
)

func convertToMp4(ctx context.Context, input ConvertToMp4Input) error {
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)
	if err != nil {
		return err
	}

	cmd := exec.Command(ffmpegPath, "-y", "-i", input.VideoPath, "-c:v", "libx264", "-crf", "23", "-preset", "fast", "-c:a", "aac", "-b:a", "128k", input.OutputPath)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
