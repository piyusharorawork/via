package core

import (
	"os/exec"

	util "quick-reel.com/util"
)

type MuteVideoInput struct {
	VideoPath  string
	OutputPath string
}

func MuteVideo(input MuteVideoInput) error {
	cmd := exec.Command("ffmpeg", "-i", input.VideoPath, "-an", "-vcodec", "copy", input.OutputPath)
	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
