package adapter

import (
	"context"

	"quickreel.com/core/src/downloader"
)

type DownloadAudioOutput struct {
	Progress int `json:"progress"`
}

func SaveAudioFile(ctx context.Context, downloader downloader.IDownloader) error {
	return downloader.DownloadAudio(ctx)
}
