package example

import (
	"context"

	"quick-reel.com/core"
	model "quick-reel.com/models"
)

func UploadFileExample(ctx context.Context) {
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceAccessKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	input := core.UploadFileInput{
		FilePath:   "/Users/piyusharora/projects/via/assets/temp/rishikesh-room-with-audio.mp4",
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
