package downloader

import (
	"context"
	"os/exec"
	"strconv"
	"strings"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

const (
	NO_CLI_PATH_ERROR = "no yt dlp cli path provided"
)

type DownloadVideoInput struct {
	WebsiteUrl     string
	OutputDir      string
	OutputFileName string
	Callback       model.ProgressCallback
}

/*
Reference https://chatgpt.com/c/67ea972f-f62c-8006-b942-f66a1288a52a
*/
func downloadVideo(ctx context.Context, input DownloadVideoInput) error {
	ytDlpCliPath, err := myctx.GetValue(ctx, model.YtDlpCliPath)

	if err != nil {
		return err
	}

	cmd := exec.Command(ytDlpCliPath, "-P", input.OutputDir, "-f", "b", "-o", input.OutputFileName, "--progress", "--force-overwrites", input.WebsiteUrl)

	err = util.StreamCommand(util.StreamCommandInput{
		Cmd: cmd,
		Callback: func(text string) {
			if input.Callback == nil {
				return
			}

			if strings.Contains(text, "Downloading") {
				input.Callback(5)
			}

			if strings.Contains(text, "[download]") && strings.Contains(text, "%") {
				percentage := getDownloadPercent(text)
				input.Callback(percentage)
			}
		},
	})

	if input.Callback != nil {
		input.Callback(100)
	}

	return err

}

/*
It reached here it means it will return download percentage
from 10 to 99 inclusive
*/
func getDownloadPercent(text string) int {
	words := strings.Split(text, " ")
	percentages := make([]string, 0)
	for _, word := range words {
		if strings.Contains(word, "%") {
			percentages = append(percentages, word)
		}
	}

	if len(percentages) == 0 {
		return 10
	}

	downloadedPercentage := percentages[len(percentages)-1]

	valStr := strings.Replace(downloadedPercentage, "%", "", -1)
	num, err := strconv.ParseFloat(valStr, 64)

	if err != nil {
		return 10
	}

	percentage := util.InterpolateAmount(10, 99, int(num))

	return percentage

}
