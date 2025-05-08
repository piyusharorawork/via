package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"quickreel.com/cli/src/adapter"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/downloader"
	"quickreel.com/core/src/util"
)

// TODO see how can we move this to adapter
// TODO add test for this
type DownloadVideoOutput struct {
	Percent int `json:"percent"`
}

func init() {
	RootCmd.AddCommand(downloadVideoCmd)
	downloadVideoCmd.Flags().StringP("website-url", "w", "", "Website Url That contains video")
	downloadVideoCmd.MarkFlagRequired("website-url")
	downloadVideoCmd.Flags().StringP("out-dir", "d", "", "Output Directory where video will be saved")
	downloadVideoCmd.MarkFlagRequired("out-dir")
	downloadVideoCmd.Flags().StringP("out-file", "f", "", "Output File Name with extension")
	downloadVideoCmd.MarkFlagRequired("out-file")
}

var downloadVideoCmd = &cobra.Command{
	Use:   "download-video",
	Short: "Download Video",
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
				printVideoProgress(percentage)
			},
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		err = adapter.SaveVideoFile(ctx, downloader)

		if err != nil {
			panic(err)
		}

	},
}

// TODO see how can we move this to adapter
func printVideoProgress(percentage int) {
	output := &DownloadVideoOutput{
		Percent: percentage,
	}
	json, err := util.ToJSON(output)
	if err != nil {
		panic(err)
	}
	fmt.Println(json)
}
