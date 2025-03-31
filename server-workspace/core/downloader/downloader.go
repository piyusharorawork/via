package downloader

import (
	"context"

	"quickreel.com/core/model"
)

type IDownloader interface {
	DownloadVideo(ctx context.Context)  error
}



type Downloader struct {
	WebsiteUrl string
	OutputDirPath string
	OutputFileName string
	Callback model.ProgressCallback
}

func (downloader *Downloader) DownloadVideo(ctx context.Context) error {
	input := DownloadVideoInput{
		WebsiteUrl: downloader.WebsiteUrl,
		OutputDir: downloader.OutputDirPath,
		OutputFileName: downloader.OutputFileName,
		Callback: downloader.Callback,
	}
	return downloadVideo(ctx, input)
}
