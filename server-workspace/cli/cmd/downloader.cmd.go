package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	clicontext "quickreel.com/cli/ctx"
	"quickreel.com/cli/util"
	"quickreel.com/core/downloader"
)

type DownloadVideoOutput struct {
	Progress  int    `json:"progress"`
	VideoPath string `json:"videoPath"`
}

var downloaderCmd = &cobra.Command{
	Use:   "download-video",
	Short: "Download Video",
	Run: func(cmd *cobra.Command, args []string) {
		videoUrl, err := cmd.Flags().GetString("video-url")
		if err != nil {
			panic(err)
		}
		outDir, err := cmd.Flags().GetString("out-dir")
		if err != nil {
			panic(err)
		}

		err = saveVideoFile(videoUrl, outDir, func(percentage int, filePath string) {
			printOutput(percentage, filePath)
		})
		if err != nil {
			panic(err)
		}

	},
}

func printOutput(percentage int, videoPath string) {
	output := &DownloadVideoOutput{
		Progress:  percentage,
		VideoPath: videoPath,
	}
	json, err := util.ToJSON(output)
	if err != nil {
		panic(err)
	}
	fmt.Println(json)
}

func saveVideoFile(videoUrl string, outDir string, callback downloader.DownloaderCallback) error {
	downloader := &downloader.Downloader{
		VideoUrl: videoUrl,
		OutDir:   outDir,
		Callback: callback,
	}

	ctx, err := clicontext.CreateCtx()

	if err != nil {
		return err
	}

	err = downloader.DownloadVideo(ctx)
	if err != nil {
		return err
	}

	return nil
}

func init() {
	rootCmd.AddCommand(downloaderCmd)
	downloaderCmd.Flags().StringP("video-url", "v", "", "Video Url")
	downloaderCmd.Flags().StringP("out-dir", "o", "", "Output Directory")
}
