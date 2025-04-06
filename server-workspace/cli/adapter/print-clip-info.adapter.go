package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/util"
)

type FrameSize struct {
	Width  int `json:"width"`
	Height int `json:"height"`
}

type PrintClipInfoOutput struct {
	Fps        int       `json:"fps"`
	FrameCount int       `json:"frameCount"`
	FrameSize  FrameSize `json:"frameSize"`
}

func PrintClipInfo(ctx context.Context, clipInfo clipinfo.IClipInfo, out io.Writer) error {
	fps, err := clipInfo.GetFPS(ctx)
	if err != nil {
		return err
	}

	frameCount, err := clipInfo.GetFrameCount(ctx)
	if err != nil {
		return err
	}

	frameSize, err := clipInfo.GetFrameSize(ctx)
	if err != nil {
		return err
	}

	output := &PrintClipInfoOutput{
		Fps:        fps,
		FrameCount: frameCount,
		FrameSize: FrameSize{
			Width:  frameSize.Width,
			Height: frameSize.Height,
		},
	}
	json, err := util.ToJSON(output)

	if err != nil {
		return err
	}

	fmt.Fprintln(out, json)

	return nil

}
