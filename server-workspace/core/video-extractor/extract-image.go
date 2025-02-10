package videoextractor

import (
	"os/exec"
	"strconv"

	commandutil "quick-reel.com/util/command-util"
)

type ExtractImageInput struct {
	VideoPath  string
	Frame      int
	OutputPath string
}

func ExtractImage(input ExtractImageInput) error {
	selection := getSelection(input.Frame)
	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", selection, "-vsync", "vfr", "-frames:v", "1", input.OutputPath)

	_, err := commandutil.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}

func getSelection(frame int) string {
	return "select=gte(n\\," + strconv.Itoa(frame) + ")"
}
