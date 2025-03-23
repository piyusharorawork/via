package extracter

import (
	"fmt"
	"os/exec"

	"quickreel.com/core/util"
)

type ExtractClipInput struct {
	VideoPath  string
	Start      int
	End        int
	OutputPath string
	Fps        int
}

func ExtractClip(input ExtractClipInput) error {
	startTime := float64(input.Start) / float64(input.Fps)
	endTime := float64(input.End) / float64(input.Fps)
	duration := endTime - startTime

	// Re-encoding ensures frame-accurate cutting.
	// Note: Placing -ss after -i performs a slower, but frame-accurate seek.
	cmd := exec.Command(
		"ffmpeg", "-y",
		"-i", input.VideoPath,
		"-ss", fmt.Sprintf("%.3f", startTime),
		"-t", fmt.Sprintf("%.3f", duration),
		"-c:v", "libx264", "-crf", "23", "-preset", "fast",
		"-r", fmt.Sprintf("%d", input.Fps),
		"-vsync", "cfr",
		input.OutputPath,
	)

	_, err := util.RunCommand(cmd)
	if err != nil {
		return err
	}

	return nil
}
