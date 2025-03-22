package vidmod

import (
	"os/exec"

	"quickreel.com/core/util"
)

type AttachAudioInput struct {
	AudioPath  string
	VideoPath  string
	OutputPath string
}

// Reference https://chatgpt.com/c/67c3312d-0f74-8006-8519-bb6ec7332c98
func AttachAudio(input AttachAudioInput) error {
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-i", input.AudioPath, "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", "-shortest", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
