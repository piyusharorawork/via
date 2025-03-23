package example

import (
	"context"

	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
)

func UploadFileExample(ctx context.Context) {
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	input := uploader.UploadFileInput{
		FilePath:   "/Users/piyusharora/projects/via/assets/temp/10-counter.webm",
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderPath,
	}

	data, err := uploader.UploadFile(input)

	if err != nil {
		panic(err)
	}

	println(data.Url)
}
