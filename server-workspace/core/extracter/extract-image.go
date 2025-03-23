package extracter

import (
	"fmt"
	"os/exec"
	"strconv"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ExtractImageInput struct {
	VideoPath  string
	Frame      int
	OutputPath string
}

func ExtractImage(input ExtractImageInput) error {
	selection := getSelectionForImage(input.Frame)
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", selection, "-vsync", "vfr", "-frames:v", "1", input.OutputPath)

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}

type ExtractResolutionImageInput struct {
	VideoPath  string
	Frame      int
	OutputPath string
	Resolution model.Resolution
}

func ExtractResolutionImage(input ExtractResolutionImageInput) error {
	selection := getSelectionForImage(input.Frame)
	dimensions, err := model.GetDimensions(input.Resolution)

	if err != nil {
		return err
	}

	scaleFilter := fmt.Sprintf("scale=%d:%d", dimensions.Width, dimensions.Height)
	filterComplex := fmt.Sprintf("%s,%s", selection, scaleFilter)

	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", filterComplex, "-vsync", "vfr", "-frames:v", "1", input.OutputPath)

	_, err = util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}

func getSelectionForImage(frame int) string {
	return "select=gte(n\\," + strconv.Itoa(frame) + ")"
}
