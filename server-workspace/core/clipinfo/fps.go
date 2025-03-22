package clipinfo

import (
	"errors"
	"os/exec"
	"strconv"
	"strings"

	"quickreel.com/core/util"
)

func GetFPS(videoPath string) (int, error) {
	cmd := exec.Command("ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "default=noprint_wrappers=1:nokey=1", videoPath)
	out, err := util.RunCommand(cmd)

	if err != nil {
		return 0, err
	}

	out = strings.TrimSpace(out)

	parts := strings.Split(out, "/")
	num, err1 := strconv.ParseFloat(parts[0], 64)
	den, err2 := strconv.ParseFloat(parts[1], 64)

	if err1 != nil || err2 != nil || den == 0 {
		return 0, errors.New("could not get fps")
	}

	fps := int(num / den)

	return fps, nil
}
