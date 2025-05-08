package uploader

type MockUploaderFactory struct {
	Url string
}

func (uploaderFactory *MockUploaderFactory) New(filePath string, folderPath string) IUploader {
	return &MockUploader{
		Url: uploaderFactory.Url,
	}
}
