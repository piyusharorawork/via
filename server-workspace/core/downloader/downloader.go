package downloader

import (
	"context"

	"quickreel.com/core/model"
)

type IDownloader interface {
	DownloadVideo() (string, error)
}

type Downloader struct {
	CliPath  string
	VideoUrl string
	OutDir   string
	Callback model.ProgressCallback
}

func (downloader *Downloader) DownloadVideo(ctx context.Context) (string, error) {
	input := DownloadVideoInput{
		VideoURL: downloader.VideoUrl,
		OutDir:   downloader.OutDir,
		Callback: downloader.Callback,
	}
	return downloadVideo(ctx, input)
}
