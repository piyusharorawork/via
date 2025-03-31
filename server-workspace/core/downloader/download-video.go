package downloader

import (
	"context"
	"errors"
	"os/exec"
	"strconv"
	"strings"

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
	ytDlpCliPath, ok := ctx.Value(model.YtDlpCliPath).(string)
	if !ok {
		return errors.New(NO_CLI_PATH_ERROR)
	}

	cmd := exec.Command(ytDlpCliPath, "-P", input.OutputDir, "-f", "b", "-o", input.OutputFileName, "--progress", "--force-overwrites", input.WebsiteUrl)

	err := util.StreamCommand(util.StreamCommandInput{
		Cmd: cmd,
		Callback: func(text string) {
			if strings.Contains(text, "Downloading") {
				input.Callback(5)
			}

			if strings.Contains(text, "[download]") && strings.Contains(text, "%") {
				percentage := getDownloadPercent(text)
				input.Callback(percentage)
			}
		},
	})

	input.Callback(100)

	return err

}

func getDownloadPercent(text string) int {
	words := strings.Split(text, " ")
	for _, word := range words {
		if strings.Contains(word, "%") {
			valStr := strings.Replace(word, "%", "", -1)
			num, err := strconv.ParseFloat(valStr, 64)

			if err != nil {
				return 5
			}

			return util.InterpolateAmount(10, 99, int(num))

		}
	}
	return 5
}
