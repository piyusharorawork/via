package extracter

import (
	"os/exec"
	"strconv"
	"strings"

	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

type ExportFramesInput struct {
	FrameCount    int
	FramesDirPath string
	PageUrl       string
	VideoWidth    int
	VideoHeight   int
	Cb            model.ProgressCallback
}

const EXPORTER_SCRIPT_PATH = "/Users/piyusharora/projects/via/web-workspace/apps/exporter/dist/exporter.js"

func ExportFrames(input ExportFramesInput) error {
	cmd := exec.Command("node", EXPORTER_SCRIPT_PATH, "-u", input.PageUrl, "-w", strconv.Itoa(input.VideoWidth), "-h", strconv.Itoa(input.VideoHeight), "-c", strconv.Itoa(input.FrameCount), "-d", input.FramesDirPath)

	err := util.StreamCommand(util.StreamCommandInput{
		Cmd: cmd,
		Callback: func(out string) {
			if strings.Contains(out, "progress") {
				percentage := strings.Split(out, "=")[1]
				percentageInt, err := strconv.Atoi(percentage)

				if err != nil {
					return
				}
				input.Cb(percentageInt)
			}

		},
	})

	if err != nil {
		return err
	}

	return nil
}
