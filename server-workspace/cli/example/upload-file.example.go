package example

import (
	"os"

	"github.com/joho/godotenv"
	"quick-reel.com/core"
)

func UploadFileExample() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	accessKey := os.Getenv("ACCESS_KEY")
	secretKey := os.Getenv("SECRET_KEY")
	region := os.Getenv("REGION")
	spaceName := os.Getenv("SPACE_NAME")

	input := core.UploadFileInput{
		VideoPath: "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		SpaceName: spaceName,
		Region:    region,
		AccessKey: accessKey,
		SecretKey: secretKey,
	}

	data, err := core.UploadFile(input)

	if err != nil {
		panic(err)
	}

	println(data.Url)
}
