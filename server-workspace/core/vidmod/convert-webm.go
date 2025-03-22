package vidmod

import (
	"os/exec"

	"quickreel.com/core/util"
)

type ConvertWebmInput struct {
	VideoPath  string
	OutputPath string
}

// Reference https://chatgpt.com/c/67a97940-f52c-8006-888d-3f7403475b22
func ConvertWebm(input ConvertWebmInput) error {
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-c:v", "libvpx-vp9", "-b:v", "1M", "-c:a", "libopus", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
