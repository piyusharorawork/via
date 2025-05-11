package uploader

import (
	"context"

	"quickreel.com/core/src/util"
)

type IUploader interface {
	UploadFile(ctx context.Context) (string, error)
}

type Uploader struct {
	FilePath         string
	FolderPath       string
	ProgressCallback func(percentage int)
	RemoveFile       bool // RemoveFile is used to remove the file after upload
}

func (uploader *Uploader) UploadFile(ctx context.Context) (string, error) {
	if uploader.RemoveFile {
		defer util.RemoveFile(uploader.FilePath)
	}

	input := uploadFileInput{
		FilePath:         uploader.FilePath,
		FolderPath:       uploader.FolderPath,
		ProgressCallback: uploader.ProgressCallback,
	}

	res, err := uploadFile(ctx, input)

	if err != nil {
		return "", err
	}

	return res.Url, nil

}
