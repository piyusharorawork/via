package main

import (
	"os"

	"github.com/joho/godotenv"
	"quick-reel.com/vidfx/uploader"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	accessKey := os.Getenv("ACCESS_KEY")
	secretKey := os.Getenv("SECRET_KEY")
	region := os.Getenv("REGION")
	spaceName := os.Getenv("SPACE_NAME")

	input := uploader.UploadFileInput{
		VideoPath: "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		SpaceName: spaceName,
		Region:    region,
		AccessKey: accessKey,
		SecretKey: secretKey,
	}

	data, err := uploader.UploadFile(input)

	if err != nil {
		panic(err)
	}

	println(data.Url)

}
