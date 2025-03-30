package downloader

import (
	"context"
	"errors"
	"os/exec"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

const (
	NO_CLI_PATH_ERROR = "no cli path provided"
)

type DownloadVideoInput struct {
	VideoURL string
	OutDir   string
	Callback DownloaderCallback
}

func downloadVideo(ctx context.Context, input DownloadVideoInput) error {
	cliPath, ok := ctx.Value(model.YtDlpCliPath).(string)
	if !ok {
		return errors.New(NO_CLI_PATH_ERROR)
	}

	outFilePath := input.OutDir + "/" + uuid.New().String()

	cmd := exec.Command(cliPath, "-o", outFilePath, input.VideoURL)

	// final file path with extension
	outFile := ""

	err := util.StreamCommand(util.StreamCommandInput{
		Cmd: cmd,
		Callback: func(text string) {
			if strings.Contains(text, "Downloading") {
				input.Callback(5, outFile)
			}

			if strings.Contains(text, "Deleting") {
				input.Callback(100, outFile)
			}

			if strings.Contains(text, "[download]") && strings.Contains(text, "%") {
				percentage := getDownloadPercent(text)
				input.Callback(percentage, outFile)
			}

			if strings.Contains(text, "[Merger]") {
				outFile = getOutFileName(text)
			}

		},
	})

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

func getOutFileName(text string) string {
	words := strings.Split(text, " ")
	for _, word := range words {
		if strings.Contains(word, ".webm") || strings.Contains(word, ".mp4") {
			word = strings.Replace(word, "\"", "", -1)
			return word
		}
	}
	return ""
}
