package core

import (
	"os/exec"

	"quick-reel.com/util"
)

type DownloadAudioInput struct {
	WebsiteUrl string
	OutputPath string
}

func DownloadAudio(input DownloadAudioInput) error {
	cmd := exec.Command("yt-dlp_macos", "-f", "bestaudio", "-x", "--audio-format", "mp3", "-o", input.OutputPath, input.WebsiteUrl)
	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
