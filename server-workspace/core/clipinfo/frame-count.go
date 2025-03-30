package clipinfo

import (
	"context"
	"errors"
	"os/exec"
	"strconv"
	"strings"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func getFrameCount(ctx context.Context, videoPath string) (int, error) {
	ffProbePath, ok := ctx.Value(model.FFProbePath).(string)
	if !ok {
		return 0, errors.New("no ffprobe path provided")
	}

	cmd := exec.Command(ffProbePath, "-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=nb_read_frames", "-of", "default=nokey=1:noprint_wrappers=1", videoPath)

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
