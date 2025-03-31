package downloader

import "context"

type MockDownloader struct {
}

func (downloader *MockDownloader) DownloadVideo(ctx context.Context) error {
	return nil
}
