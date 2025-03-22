package imgmod

import (
	"errors"
	"os/exec"
	"strconv"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ResizeImageInput struct {
	ImagePath  string
	Resolution model.Resolution
	OutputPath string
}

// Reference https://chatgpt.com/c/67c48719-d758-8006-aa01-9180ac0f714b
func ResizeImage(input ResizeImageInput) error {

	dimensions, found := model.Resolutions[input.Resolution]
	if !found {
		return errors.New("resolution not found")
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", input.ImagePath, "-vf", "scale="+strconv.Itoa(dimensions.Width)+":"+strconv.Itoa(dimensions.Height), input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
