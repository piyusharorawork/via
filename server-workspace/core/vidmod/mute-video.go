package vidmod

import (
	"os/exec"

	"quickreel.com/core/util"
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
