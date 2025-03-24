package clipinfo

import (
	"errors"
	"os/exec"
	"strconv"
	"strings"

	"quickreel.com/core/util"
)

func getFrameSize(videoPath string) (*FrameSize, error) {
	cmd := exec.Command("ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "default=noprint_wrappers=1", videoPath)

	cmdOut, err := util.RunCommand(cmd)
	if err != nil {
		return nil, err
	}

	cmdOut = strings.TrimSpace(cmdOut)
	tokens := strings.Split(cmdOut, "\n")
	widthStr := strings.Split(tokens[0], "width=")[1]
	heightStr := strings.Split(tokens[1], "height=")[1]

	width, widthErr := strconv.Atoi(widthStr)
	height, heightErr := strconv.Atoi(heightStr)

	if widthErr != nil || heightErr != nil {
		return nil, errors.New("invalid width and height")
	}

	if width == 0 || height == 0 {
		return nil, errors.New("width and height not found")
	}

	frameSize := &FrameSize{
		Width:  width,
		Height: height,
	}

	return frameSize, nil
}
