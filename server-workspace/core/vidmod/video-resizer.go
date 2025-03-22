package vidmod

import (
	"errors"
	"os/exec"
	"strconv"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ResizeVideoInput struct {
	VideoPath  string
	Resolution model.Resolution
	OutputPath string
}

func ResizeVideo(input ResizeVideoInput) error {
	dimensions, found := model.Resolutions[input.Resolution]
	if !found {
		return errors.New("resolution not found")
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", "scale="+strconv.Itoa(dimensions.Width)+":"+strconv.Itoa(dimensions.Height), "-c:a", "copy", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
