package cmd

import (
	"context"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
	clicontext "quickreel.com/cli/ctx"
	"quickreel.com/cli/util"
	"quickreel.com/core/clipinfo"
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

var clipInfoCmd = &cobra.Command{
	Use:   "clip-info",
	Short: "Print clip info",
	Long:  `Print clip info`,
	Run: func(cmd *cobra.Command, args []string) {
		videoPath, err := cmd.Flags().GetString("video-path")

		if err != nil {
			panic(err)
		}
		clipInfo := &clipinfo.ClipInfo{
			VideoPath: videoPath,
		}

		ctx, err := clicontext.CreateCtx()

		if err != nil {
			panic(err)
		}

		err = printClipInfo(ctx, clipInfo, os.Stdout)
		if err != nil {
			panic(err)
		}
	},
}

func printClipInfo(ctx context.Context, clipInfo clipinfo.IClipInfo, out io.Writer) error {
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

func init() {
	rootCmd.AddCommand(clipInfoCmd)
	clipInfoCmd.Flags().StringP("video-path", "v", "", "Video path")
}
