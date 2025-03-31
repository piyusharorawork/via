package vidmod

import (
	"context"
	"errors"
	"os/exec"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ConvertToMp4Input struct {
	VideoPath string
	OutputPath string
}

const (NO_FFMPEG_PATH_ERROR = "no ffmpeg path provided")

func convertToMp4(ctx context.Context, input ConvertToMp4Input)  error{
	ffmpegPath, ok := ctx.Value(model.FFMpegPath).(string)

	if !ok {
		return errors.New(NO_FFMPEG_PATH_ERROR)
	}

	cmd := exec.Command(ffmpegPath, "-y", "-i", input.VideoPath,"-c:v","libx264","-crf","23","-preset","fast","-c:a","aac","-b:a","128k",input.OutputPath)

	println("Command: ", cmd.String()) // TODO configure logger

	_,err :=  util.RunCommand(cmd) 

	if err != nil {
		return err
	}

	return nil
}