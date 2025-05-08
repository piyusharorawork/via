package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/src/uploader"
	"quickreel.com/core/src/util"
	"quickreel.com/core/src/vidmod"
)

type CopyMp4UrlOutput struct {
	Url string `json:"url"`
}

func PrintMp4Url(ctx context.Context, modifier vidmod.IVideoModifier, uploader uploader.IUploader, writer io.Writer) {
	err := modifier.ConvertToMp4(ctx)
	if err != nil {
		panic(err)
	}

	url, err := uploader.UploadFile(ctx)

	if err != nil {
		panic(err)
	}

	out := &CopyMp4UrlOutput{
		Url: url,
	}

	json, err := util.ToJSON(out)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(writer, json)
}
