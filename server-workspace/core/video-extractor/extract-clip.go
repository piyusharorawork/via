package videoextractor

import (
	"fmt"
	"os/exec"

	commandutil "quick-reel.com/util/command-util"
)

type ExtractClipInput struct {
	VideoPath  string
	StartFrame int
	EndFrame   int
	OutputPath string
	Fps        int
}

func ExtractClip(input ExtractClipInput) error {
	startTime := float64(input.StartFrame) / float64(input.Fps)
	endTime := float64(input.EndFrame) / float64(input.Fps)
	duration := endTime - startTime

	// Re-encoding ensures frame-accurate cutting.
	// Note: Placing -ss after -i performs a slower, but frame-accurate seek.
	cmd := exec.Command(
		"ffmpeg", "-y",
		"-i", input.VideoPath,
		"-ss", fmt.Sprintf("%.3f", startTime),
		"-t", fmt.Sprintf("%.3f", duration),
		"-c:v", "libx264", "-crf", "23", "-preset", "fast",
		input.OutputPath,
	)

	_, err := commandutil.RunCommand(cmd)
	if err != nil {
		return err
	}

	return nil
}
