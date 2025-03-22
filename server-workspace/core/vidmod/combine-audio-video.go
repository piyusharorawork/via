package vidmod

import (
	"os/exec"

	"quickreel.com/core/util"
)

type CombineAudioVideoInput struct {
	AudioPath  string
	VideoPath  string
	OutputPath string
}

func CombineAudioVideo(input CombineAudioVideoInput) error {
	cmd := exec.Command("ffmpeg", "-y", "-i", input.AudioPath, "-i", input.VideoPath, "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", input.OutputPath)
	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
