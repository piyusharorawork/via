package cmd

import (
	"os"

	"github.com/spf13/cobra"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
)

func init() {
	RootCmd.AddCommand(extractorCmd)
	extractorCmd.Flags().StringP("video-url", "u", "", "Video Url")
	extractorCmd.MarkFlagRequired("video-url")
	extractorCmd.Flags().StringP("out-file", "o", "", "Output image file path")
	extractorCmd.MarkFlagRequired("out-file")
	extractorCmd.Flags().IntP("frame", "f", 0, "frame number")
	extractorCmd.MarkFlagRequired("frame")
}

var extractorCmd = &cobra.Command{
	Use:   "extract-image",
	Short: "Extract Image",
	Run: func(cmd *cobra.Command, args []string) {
		videoUrl, err := cmd.Flags().GetString("video-url")
		if err != nil {
			panic(err)
		}
		outFilePath, err := cmd.Flags().GetString("out-file")
		if err != nil {
			panic(err)
		}
		frameNo, err := cmd.Flags().GetInt("frame")
		if err != nil {
			panic(err)
		}

		imgExtractor := &extractor.Extractor{
			VideoPath:  videoUrl,
			OutputPath: outFilePath,
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		adapter.SaveExtractedImage(ctx, imgExtractor, frameNo, os.Stdout)

	},
}
