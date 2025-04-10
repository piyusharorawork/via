package cmd

import (
	"os"

	"github.com/spf13/cobra"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
)

func init() {
	RootCmd.AddCommand(extractCompressedImageCmd)
	extractCompressedImageCmd.Flags().StringP("video-path", "v", "", "Video url/path of video file to extract clip from")
	extractCompressedImageCmd.Flags().StringP("output-path", "o", "", "Path where image file will be saved")
	extractCompressedImageCmd.Flags().IntP("frame-no", "f", 0, "Frame number")
	extractCompressedImageCmd.Flags().StringP("resolution", "r", "", "Resolution of image")

}

var extractCompressedImageCmd = &cobra.Command{
	Use:   "extract-compressed-image",
	Short: "Extract compressed image",
	Run: func(cmd *cobra.Command, args []string) {
		videoPath, err := cmd.Flags().GetString("video-path")
		if err != nil {
			panic(err)
		}

		outputPath, err := cmd.Flags().GetString("output-path")
		if err != nil {
			panic(err)
		}

		frameNo, err := cmd.Flags().GetInt("frame-no")
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

		imgExtractor := &extractor.Extractor{
			VideoPath:  videoPath,
			OutputPath: outputPath,
		}

		adapter.SaveCompressedExtractedImage(ctx, imgExtractor, frameNo, resolution, os.Stdout)

	},
}
