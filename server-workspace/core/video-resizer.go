package core

import (
	"errors"
	"os/exec"
	"strconv"

	util "quick-reel.com/util"
)

type Resolution string

const (
	ULTRA_HD_2160p       Resolution = "ULTRA_HD_2160p"
	QUAD_HD_1440p        Resolution = "QUAD_HD_1440p"
	FULL_HD_1080p        Resolution = "FULL_HD_1080p"
	HD_720p              Resolution = "HD_720p"
	LOW_RES_HD_540p      Resolution = "LOW_RES_HD_540p"
	SD_480p              Resolution = "SD_480p"
	VERY_LOW_SD_360p     Resolution = "VERY_LOW_SD_360p"
	EXTREMLY_LOW_SD_240p Resolution = "EXTREMLY_LOW_SD_240p"
	ULTRA_LOW_SD_180p    Resolution = "ULTRA_LOW_SD_180p"
	MINIMAL_SD_144p      Resolution = "MINIMAL_SD_144p"
	LOWEST_SD_120p       Resolution = "LOWEST_SD_120p"
	BARE_MINIMUM_SD_96p  Resolution = "BARE_MINIMUM_SD_96p"
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
	"EXTREMLY_LOW_SD_240p": {
		Height: 426,
		Width:  240,
	},
	"ULTRA_LOW_SD_180p": {
		Height: 320,
		Width:  180,
	},
	"MINIMAL_SD_144p": {
		Height: 256,
		Width:  144,
	},
	"LOWEST_SD_120p": {
		Height: 213,
		Width:  120,
	},
	"BARE_MINIMUM_SD_96p": {
		Height: 170,
		Width:  96,
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

	_, err := util.RunCommand(cmd)

	if err != nil {
		return err
	}

	return nil

}
