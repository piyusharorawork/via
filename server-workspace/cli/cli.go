package main

import (
	"os"

	"github.com/joho/godotenv"
	"quick-reel.com/vidfx/uploader"
	videoanalyser "quick-reel.com/vidfx/video-analyser"

	videoresizer "quick-reel.com/vidfx/video-resizer"
)

func main() {
	AnalyseVideoExample()
}

func AnalyseVideoExample() {
	frameSize, err := videoanalyser.GetFrameSize("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameSize.Width)
	println(frameSize.Height)
}

func ResizeVideoExample() {
	input := videoresizer.ResizeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Resolution: videoresizer.SD_480p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
	}

	err := videoresizer.ResizeVideo(input)
	if err != nil {
		panic(err)
	}

}

func UploadFileExample() {
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
