package videomodifier

import (
	"errors"
	"os/exec"
	"strconv"

	commandutil "quick-reel.com/util/command-util"
)

type Resolution string

const (
	ULTRA_HD_2160p   Resolution = "ULTRA_HD_2160p"
	QUAD_HD_1440p    Resolution = "QUAD_HD_1440p"
	FULL_HD_1080p    Resolution = "FULL_HD_1080p"
	HD_720p          Resolution = "HD_720p"
	LOW_RES_HD_540p  Resolution = "LOW_RES_HD_540p"
	SD_480p          Resolution = "SD_480p"
	VERY_LOW_SD_360p Resolution = "VERY_LOW_SD_360p"
)

type Dimenstions struct {
	Width  int
	Height int
}

var resolutions = map[Resolution]Dimenstions{
	"ULTRA_HD_2160p": {
		Height: 3840,
		Width:  2160,
	},
	"QUAD_HD_1440p": {
		Height: 2560,
		Width:  1440,
	},
	"FULL_HD_1080p": {
		Height: 1920,
		Width:  1080,
	},
	"HD_720p": {
		Height: 1280,
		Width:  720,
	},
	"LOW_RES_HD_540p": {
		Height: 960,
		Width:  540,
	},
	"SD_480p": {
		Height: 854,
		Width:  480,
	},
	"VERY_LOW_SD_360p": {
		Height: 640,
		Width:  360,
	},
}

type ResizeVideoInput struct {
	VideoPath  string
	Resolution Resolution
	OutputPath string
}

func ResizeVideo(input ResizeVideoInput) error {
	dimensions, found := resolutions[input.Resolution]
	if !found {
		return errors.New("resolution not found")
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", input.VideoPath, "-vf", "scale="+strconv.Itoa(dimensions.Width)+":"+strconv.Itoa(dimensions.Height), "-c:a", "copy", input.OutputPath)

	_, err := commandutil.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
