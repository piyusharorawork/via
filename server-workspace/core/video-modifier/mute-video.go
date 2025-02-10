package videomodifier

import (
	"os/exec"

	commandutil "quick-reel.com/util/command-util"
)

type MuteVideoInput struct {
	VideoPath  string
	OutputPath string
}

func MuteVideo(input MuteVideoInput) error {
	cmd := exec.Command("ffmpeg", "-i", input.VideoPath, "-an", "-vcodec", "copy", input.OutputPath)
	_, err := commandutil.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
