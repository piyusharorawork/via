package cmd

import (
	"github.com/spf13/cobra"
	"quickreel.com/cli/src/adapter"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/vidmod"
)

func init() {
	RootCmd.AddCommand(compressVideoCmd)
	compressVideoCmd.Flags().StringP("video-path", "v", "", "Video url/path of video file to compress")
	compressVideoCmd.MarkFlagRequired("video-path")
	compressVideoCmd.Flags().StringP("output-path", "o", "", "Output file path")
	compressVideoCmd.MarkFlagRequired("output-path")
	compressVideoCmd.Flags().StringP("resolution", "r", "", "Resolution")
	compressVideoCmd.MarkFlagRequired("resolution")
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
