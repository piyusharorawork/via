package core

import (
	"errors"
	"os/exec"
	"strconv"
	"strings"

	util "quick-reel.com/util/command-util"
)

func GetFrameCount(videoPath string) (int, error) {
	cmd := exec.Command("ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=nb_read_frames", "-of", "default=nokey=1:noprint_wrappers=1", videoPath)

	cmdOut, err := util.RunCommand(cmd)
	if err != nil {
		return 0, err
	}

	frameCount, err := strconv.Atoi(strings.TrimSpace(cmdOut))

	if err != nil {
		return 0, errors.New("frame count not number")
	}

	return frameCount, nil

}
