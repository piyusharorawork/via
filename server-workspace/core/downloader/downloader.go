package downloader

import (
	"context"
)

type IDownloader interface {
	DownloadVideo() (string, error)
}

type DownloaderCallback func(int, string)

type Downloader struct {
	CliPath  string
	VideoUrl string
	OutDir   string
	Callback DownloaderCallback
}

func (downloader *Downloader) DownloadVideo(ctx context.Context) error {
	input := DownloadVideoInput{
		VideoURL: downloader.VideoUrl,
		OutDir:   downloader.OutDir,
		Callback: downloader.Callback,
	}
	return downloadVideo(ctx, input)
}
