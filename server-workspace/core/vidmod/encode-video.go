package vidmod

import (
	"os/exec"

	"quickreel.com/core/util"
)

type EncodeVideoInput struct {
	VideoPath  string
	OutputPath string
}

// Reference https://chatgpt.com/c/67a97940-f52c-8006-888d-3f7403475b22
func EncodeVideo(input EncodeVideoInput) error {
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-c:v", "libx264", "-crf", "23", "-preset", "fast", "-c:a", "aac", "-b:a", "128k", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
