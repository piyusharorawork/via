package downloader

import "context"

type MockDownloader struct {
	DownloadVideoCalled bool
	DownloadAudioCalled bool
}

func (downloader *MockDownloader) DownloadVideo(ctx context.Context) error {
	downloader.DownloadVideoCalled = true
	return nil
}

func (downloader *MockDownloader) DownloadAudio(ctx context.Context) error {
	downloader.DownloadAudioCalled = true
	return nil
}
