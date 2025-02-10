package core

import (
	"os/exec"
	"strconv"

	util "quick-reel.com/util/command-util"
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

func getSelectionForImage(frame int) string {
	return "select=gte(n\\," + strconv.Itoa(frame) + ")"
}
