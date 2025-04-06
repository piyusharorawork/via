package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

type UploadFileOutput struct {
	Url string `json:"url"`
}

func PrintUploadedUrl(ctx context.Context, uploader uploader.IUploader, writer io.Writer) {
	url, err := uploader.UploadFile(ctx)

	if err != nil {
		panic(err)
	}

	output := &UploadFileOutput{
		Url: url,
	}

	json, err := util.ToJSON(output)

	if err != nil {
		panic(err)
	}

	fmt.Fprintln(writer, json)
}
