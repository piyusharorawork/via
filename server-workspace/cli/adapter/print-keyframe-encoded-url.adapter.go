package adapter

import (
	"context"
	"fmt"
	"io"

	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
	"quickreel.com/core/vidmod"
)

type KeyFrameEncodedOutput struct {
	Url string `json:"url"`
}

func PrintKeyFrameEncodedVideoUrl(ctx context.Context, modifier vidmod.IVideoModifier, uploader uploader.IUploader, writer io.Writer) {
	err := modifier.KeyFrameEncode(ctx)

	if err != nil {
		panic(err)
	}

	url, err := uploader.UploadFile(ctx)

	if err != nil {
		panic(err)
	}

	out := Output{
		Url: url,
	}

	json, err := util.ToJSON(out)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(writer, json)
}
