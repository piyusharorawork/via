package downloader

import (
	"os/exec"

	commandutil "quick-reel.com/util/command-util"
)

type DownloadVideoInput struct {
	VideoURL   string
	OutputPath string
}

func DownloadVideo(input DownloadVideoInput) error {
	cmd := exec.Command("yt-dlp_macos", "-f", "mp4", "-o", input.OutputPath, input.VideoURL)
	_, err := commandutil.RunCommand(cmd)
	if err != nil {
		return err
	}

	return nil
}
