package core

import (
	"os/exec"

	util "quick-reel.com/util"
)

type DownloadVideoInput struct {
	VideoURL   string
	OutputPath string
}

func DownloadVideo(input DownloadVideoInput) error {
	cmd := exec.Command("yt-dlp_macos", "-f", "mp4", "-o", input.OutputPath, input.VideoURL)
	_, err := util.RunCommand(cmd)
	if err != nil {
		return err
	}

	return nil
}
