package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/downloader"
	"quickreel.com/core/util"
)

// TODO see how can we move this to adapter
type DownloadAudioOutput struct {
	Progress int `json:"progress"`
}

func init() {
	RootCmd.AddCommand(downloadAudioCmd)
	downloadAudioCmd.Flags().StringP("website-url", "w", "", "Website Url That contains audio")
	downloadAudioCmd.MarkFlagRequired("website-url")
	downloadAudioCmd.Flags().StringP("out-dir", "d", "", "Output Directory where audio will be saved")
	downloadAudioCmd.MarkFlagRequired("out-dir")
	downloadAudioCmd.Flags().StringP("out-file", "f", "", "Output File Name with extension")
	downloadAudioCmd.MarkFlagRequired("out-file")
}

var downloadAudioCmd = &cobra.Command{
	Use:   "download-audio",
	Short: "Download Audio",
	Run: func(cmd *cobra.Command, args []string) {
		websiteUrl, err := cmd.Flags().GetString("website-url")
		if err != nil {
			panic(err)
		}
		outDir, err := cmd.Flags().GetString("out-dir")
		if err != nil {
			panic(err)
		}

		outFileName, err := cmd.Flags().GetString("out-file")
		if err != nil {
			panic(err)
		}

		downloader := &downloader.Downloader{
			WebsiteUrl:     websiteUrl,
			OutputDirPath:  outDir,
			OutputFileName: outFileName,
			Callback: func(percentage int) {
				printAudioProgress(percentage)
			},
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		err = adapter.SaveAudioFile(ctx, downloader)

		if err != nil {
			panic(err)
		}

	},
}

// TODO see how can we move this to adapter
func printAudioProgress(percentage int) {
	output := &DownloadAudioOutput{
		Progress: percentage,
	}
	json, err := util.ToJSON(output)
	if err != nil {
		panic(err)
	}
	fmt.Println(json)
}
