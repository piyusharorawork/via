package main

import (
	"os"

	"github.com/joho/godotenv"
	"quick-reel.com/vidfx/uploader"
	videoanalyser "quick-reel.com/vidfx/video-analyser"
	videoextractor "quick-reel.com/vidfx/video-extractor"

	videoresizer "quick-reel.com/vidfx/video-resizer"
)

func main() {
	ExtractClipExample()

}

func GetFrameSizeExample() {
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

func GetFrameCountExample() {
	frameCount, err := videoanalyser.GetFrameCount("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameCount)
}

func ExtractImageExample() {
	err := videoextractor.ExtractImage(videoextractor.ExtractImageInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Frame:      200,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.png",
	})

	if err != nil {
		panic(err)
	}
}

func ExtractClipExample() {
	err := videoextractor.ExtractClip(videoextractor.ExtractClipInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		StartFrame: 379,
		EndFrame:   392,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.mp4",
		Fps:        30,
	})

	if err != nil {
		panic(err)
	}
}

func EncodeVideoExample() {
	err := videoresizer.EncodeVideo(videoresizer.EncodeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-encoded.mp4",
	})

	if err != nil {
		panic(err)
	}
}
