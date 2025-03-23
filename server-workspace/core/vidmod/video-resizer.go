package vidmod

import (
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

	dimensions, err := model.GetDimensions(input.Resolution)
	if err != nil {
		return err
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", "scale="+strconv.Itoa(dimensions.Width)+":"+strconv.Itoa(dimensions.Height), "-c:a", "copy", input.OutputPath)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
