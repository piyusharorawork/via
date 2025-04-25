package downloader

import (
	"context"
	"os/exec"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type DownloadAudioInput struct {
	WebsiteUrl     string
	OutputDir      string
	OutputFileName string
}

func downloadAudio(ctx context.Context, input DownloadAudioInput) error {
	ytDlpCliPath, err := myctx.GetValue(ctx, model.YtDlpCliPath)

	if err != nil {
		return err
	}

	ffmpegPath, err := myctx.GetValue(ctx, model.FFMpegPath)

	if err != nil {
		return err
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

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
