package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	clicontext "quickreel.com/cli/ctx"
	"quickreel.com/cli/util"
	"quickreel.com/core/downloader"
	"quickreel.com/core/model"
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

		filePath, err := saveVideoFile(videoUrl, outDir, func(percentage int) {
			printOutput(percentage, "")
		})
		if err != nil {
			panic(err)
		}

		printOutput(100, filePath)

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

func saveVideoFile(videoUrl string, outDir string, callback model.ProgressCallback) (string, error) {
	downloader := &downloader.Downloader{
		VideoUrl: videoUrl,
		OutDir:   outDir,
		Callback: callback,
	}

	ctx, err := clicontext.CreateCtx()

	if err != nil {
		return "", err
	}

	filePath, err := downloader.DownloadVideo(ctx)
	if err != nil {
		return "", err
	}

	return filePath, nil
}

func init() {
	rootCmd.AddCommand(downloaderCmd)
	downloaderCmd.Flags().StringP("video-url", "v", "", "Video Url")
	downloaderCmd.Flags().StringP("out-dir", "o", "", "Output Directory")
}
