package core

import (
	"os/exec"
	"path/filepath"
	"strconv"

	"quick-reel.com/util"
)

type ConvertFramesToVideoInput struct {
	FramesDirPath string
	OutputPath    string
	Fps           int
}

func ConvertFramesToVideo(input ConvertFramesToVideoInput) error {

	filePattern := "%d.png"
	fullPath := filepath.Join(input.FramesDirPath, filePattern)

	cmd := exec.Command("ffmpeg", "-y", "-i", fullPath, "-framerate", strconv.Itoa(input.Fps), "-c:v", "libx264", "-pix_fmt", "yuv420p", input.OutputPath)
	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
