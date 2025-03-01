package example

import (
	"context"

	"quick-reel.com/core"
	model "quick-reel.com/models"
)

func UploadFileExample(ctx context.Context) {
	accessKey := ctx.Value(model.AccessKey).(string)
	secretKey := ctx.Value(model.SecretKey).(string)
	region := ctx.Value(model.Region).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	input := core.UploadFileInput{
		FilePath:   "/Users/piyusharora/projects/via/assets/temp/rishikesh-output-with-audio-encoded.mp4",
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderPath,
	}

	data, err := core.UploadFile(input)

	if err != nil {
		panic(err)
	}

	println(data.Url)
}
