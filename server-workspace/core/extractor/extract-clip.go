package extractor

import (
	"context"
	"fmt"
	"os/exec"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ExtractClipInput struct {
	VideoPath  string
	Start      int
	End        int
	OutputPath string
	Fps        int
}

/*
Here the frame count will be accurate but can be off by 1 frame
*/
func extractClip(ctx context.Context, input ExtractClipInput) error {
	// Retrieve the FFmpeg path from the context.
	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)
	if err != nil {
		return fmt.Errorf("ffmpeg path not found in context: %w", err)
	}

	// Calculate the start time in seconds based on the frame number.
	startTime := float64(input.Start) / float64(input.Fps)

	// Calculate the clip duration to include exactly (end - start + 1) frames.
	duration := float64(input.End-input.Start+1) / float64(input.Fps)

	// Construct the FFmpeg command to extract the clip with accurate frame count.
	cmd := exec.Command(
		ffmpegPath, "-y",
		"-i", input.VideoPath,
		"-ss", fmt.Sprintf("%.6f", startTime),
		"-t", fmt.Sprintf("%.6f", duration),
		"-c:v", "libx264", "-crf", "23", "-preset", "fast",
		"-r", fmt.Sprintf("%d", input.Fps),
		"-vsync", "cfr",
		input.OutputPath,
	)

	// Run the command and return any error.
	if _, err = util.RunCommand(cmd); err != nil {
		return err
	}

	return nil
}
