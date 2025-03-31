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
}

func init() {
	rootCmd.AddCommand(downloaderCmd)
	downloaderCmd.Flags().StringP("website-url", "w", "", "Website Url That contains video")
	downloaderCmd.Flags().StringP("out-dir", "d", "", "Output Directory where video will be saved")
	downloaderCmd.Flags().StringP("out-file","f","","Output File Name with extension")
}


var downloaderCmd = &cobra.Command{
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
			WebsiteUrl:  websiteUrl,
			OutputDirPath: outDir,
			OutputFileName: outFileName,
			Callback: func(percentage int) {
				printOutput(percentage)
			},
		}

		err = saveVideoFile(downloader) 

		if err != nil {
			panic(err)
		}

	},
}



func saveVideoFile(downloader downloader.IDownloader ) error {
	
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

func printOutput(percentage int) {
	output := &DownloadVideoOutput{
		Progress:  percentage,
	}
	json, err := util.ToJSON(output)
	if err != nil {
		panic(err)
	}
	fmt.Println(json)
}