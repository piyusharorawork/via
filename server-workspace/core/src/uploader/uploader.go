package uploader

import (
	"context"

	"quickreel.com/core/src/util"
)

type IUploader interface {
	UploadFile(ctx context.Context) (string, error)
}

type Uploader struct {
	FilePath   string
	FolderPath string
	// RemoveFile is used to remove the file after upload
	RemoveFile bool
}

func (uploader *Uploader) UploadFile(ctx context.Context) (string, error) {
	if uploader.RemoveFile {
		defer util.RemoveFile(uploader.FilePath)
	}

	input := UploadFileInput{
		FilePath:   uploader.FilePath,
		FolderPath: uploader.FolderPath,
	}

	res, err := uploadFile(ctx, input)

	if err != nil {
		return "", err
	}

	return res.Url, nil

}
