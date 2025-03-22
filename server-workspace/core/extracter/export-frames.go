package extracter

import (
	"os/exec"
	"strconv"

	"quickreel.com/core/util"
)

type ExportFramesInput struct {
	FrameCount    int
	FramesDirPath string
	PageUrl       string
	VideoWidth    int
	VideoHeight   int
}

const EXPORTER_SCRIPT_PATH = "/Users/piyusharora/projects/via/web-workspace/apps/exporter/dist/exporter.js"

func ExportFrames(input ExportFramesInput) error {
	cmd := exec.Command("node", EXPORTER_SCRIPT_PATH, "-u", input.PageUrl, "-w", strconv.Itoa(input.VideoWidth), "-h", strconv.Itoa(input.VideoHeight), "-c", strconv.Itoa(input.FrameCount), "-d", input.FramesDirPath)

	err := util.StreamCommand(cmd)

	if err != nil {
		return err
	}

	return nil
}
