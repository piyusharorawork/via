package core

import (
	"os/exec"

	util "quick-reel.com/util/command-util"
)

type EncodeVideoInput struct {
	VideoPath  string
	OutputPath string
}

func EncodeVideo(input EncodeVideoInput) error {
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-c:v", "libx264", "-crf", "23", "-preset", "fast", "-c:a", "aac", "-b:a", "128k", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
