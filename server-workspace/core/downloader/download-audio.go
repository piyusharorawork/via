package downloader

import (
	"context"
	"errors"
	"os/exec"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type DownloadAudioInput struct {
	WebsiteUrl     string
	OutputDir      string
	OutputFileName string
}

func downloadAudio(ctx context.Context, input DownloadAudioInput) error {
	ytDlpCliPath, ok := ctx.Value(model.YtDlpCliPath).(string)
	if !ok {
		return errors.New(NO_CLI_PATH_ERROR)
	}

	ffmpegPath, ok := ctx.Value(model.FFMpegPath).(string)
	if !ok {
		return errors.New("no ffmpeg")
	}

	cmd := exec.Command(
		ytDlpCliPath,
		"-P", input.OutputDir,
		"-x", "--audio-format", "mp3",
		"-o", input.OutputFileName,
		"--progress",
		"--force-overwrites",
		"--ffmpeg-location", ffmpegPath,
		input.WebsiteUrl,
	)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
