package adapter

import (
	"context"

	"quickreel.com/core/downloader"
)

type DownloadVideoOutput struct {
	Progress int `json:"progress"`
}

func SaveVideoFile(ctx context.Context, downloader downloader.IDownloader) error {
	return downloader.DownloadVideo(ctx)
}
