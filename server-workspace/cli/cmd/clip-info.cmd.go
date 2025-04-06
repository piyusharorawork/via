package cmd

import (
	"os"

	"github.com/spf13/cobra"

	"quickreel.com/cli/adapter"
	"quickreel.com/core/clipinfo"
	myctx "quickreel.com/core/ctx"
)

func init() {
	RootCmd.AddCommand(clipInfoCmd)
	clipInfoCmd.Flags().StringP("video-path", "v", "", "Video path")
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

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		err = adapter.PrintClipInfo(ctx, clipInfo, os.Stdout)
		if err != nil {
			panic(err)
		}
	},
}
