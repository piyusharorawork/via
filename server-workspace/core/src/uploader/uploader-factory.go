package uploader

type IUploaderFactory interface {
	New(filePath string, folderPath string) IUploader
}

type UploaderFactory struct {
}

func (uploaderFactory *UploaderFactory) New(filePath string, folderPath string) IUploader {
	return &Uploader{
		FilePath:   filePath,
		FolderPath: folderPath,
		RemoveFile: true, // Not configurable right now
	}
}
