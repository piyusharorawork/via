package cmd

import (
	"github.com/spf13/cobra"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
)

func init() {
	RootCmd.AddCommand(extractClipCmd)
	extractClipCmd.Flags().StringP("video-path", "v", "", "Video url/path of video file to extract clip from")
	extractClipCmd.Flags().StringP("output-path", "o", "", "Path where video file will be saved")
	extractClipCmd.Flags().IntP("start-frame-no", "s", 0, "Start frame number")
	extractClipCmd.Flags().IntP("end-frame-no", "e", 0, "End frame number")
	extractClipCmd.Flags().IntP("fps", "f", 0, "Frames per second")
}

var extractClipCmd = &cobra.Command{
	Use:   "extract-clip",
	Short: "Extract clip",
	Run: func(cmd *cobra.Command, args []string) {
		videoPath, err := cmd.Flags().GetString("video-path")
		if err != nil {
			panic(err)
		}

		outputPath, err := cmd.Flags().GetString("output-path")
		if err != nil {
			panic(err)
		}

		startFrameNo, err := cmd.Flags().GetInt("start-frame-no")
		if err != nil {
			panic(err)
		}
		endFrameNo, err := cmd.Flags().GetInt("end-frame-no")
		if err != nil {
			panic(err)
		}
		fps, err := cmd.Flags().GetInt("fps")
		if err != nil {
			panic(err)
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		extractor := &extractor.Extractor{
			VideoPath:  videoPath,
			OutputPath: outputPath,
		}

		adapter.ExtractClip(ctx, extractor, startFrameNo, endFrameNo, fps)
	},
}
