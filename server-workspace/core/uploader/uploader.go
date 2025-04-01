package uploader

import "context"

type IUploader interface {
	UploadFile(ctx context.Context) (string, error)
}

type Uploader struct {
	FilePath   string
	FolderPath string
}

func (uploader *Uploader) UploadFile(ctx context.Context) (string, error) {
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
