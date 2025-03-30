package downloader

type MockDownloader struct {
}

func (downloader *MockDownloader) DownloadVideo() error {
	return nil
}
