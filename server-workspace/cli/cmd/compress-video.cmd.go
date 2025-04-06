package cmd

import (
	"github.com/spf13/cobra"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/vidmod"
)

func init() {
	RootCmd.AddCommand(compressVideoCmd)
	compressVideoCmd.Flags().StringP("video-path", "v", "", "Video url/path of video file to compress")
	compressVideoCmd.Flags().StringP("output-path", "o", "", "Output file path")
	compressVideoCmd.Flags().StringP("resolution", "r", "", "Resolution")
}

var compressVideoCmd = &cobra.Command{
	Use:   "compress-video",
	Short: "Compress video",
	Run: func(cmd *cobra.Command, args []string) {
		videoPath, err := cmd.Flags().GetString("video-path")
		if err != nil {
			panic(err)
		}

		outputPath, err := cmd.Flags().GetString("output-path")
		if err != nil {
			panic(err)
		}

		resolution, err := cmd.Flags().GetString("resolution")
		if err != nil {
			panic(err)
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		modifier := &vidmod.VideoModifier{
			VideoPath:  videoPath,
			OutputPath: outputPath,
		}

		adapter.CompressVideo(ctx, modifier, resolution)

	},
}
