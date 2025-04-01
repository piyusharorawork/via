package uploader

import "context"

type MockUploader struct {
	Url string
}

func (uploader *MockUploader) UploadFile(ctx context.Context) (string, error) {
	return uploader.Url, nil
}
