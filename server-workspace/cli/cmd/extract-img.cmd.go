package cmd

import (
	"context"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
)

func init() {
	rootCmd.AddCommand(extractorCmd)
	extractorCmd.Flags().StringP("video-url", "u", "", "Video Url")
	extractorCmd.Flags().StringP("out-file", "o", "", "Output image file path")
	extractorCmd.Flags().IntP("frame", "f", 0, "frame number")
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

		saveExtractedImage(ctx, imgExtractor, frameNo, os.Stdout)

	},
}

func saveExtractedImage(ctx context.Context, imgExtractor extractor.IExtractor, frameNo int, writer io.Writer) {
	err := imgExtractor.ExtractImage(ctx, frameNo)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(writer, "Image saved")
}
