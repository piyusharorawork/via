package main

import (
	"os"

	"github.com/joho/godotenv"
	core "quick-reel.com/core"
)

func main() {
	GetMomentExample()

}

func GetFrameSizeExample() {
	frameSize, err := core.GetFrameSize("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameSize.Width)
	println(frameSize.Height)
}

func ResizeVideoExample() {

	input := core.ResizeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Resolution: core.SD_480p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
	}

	err := core.ResizeVideo(input)
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

func GetFrameCountExample() {
	frameCount, err := core.GetFrameCount("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameCount)
}

func ExtractImageExample() {
	err := core.ExtractImage(core.ExtractImageInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Frame:      200,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.png",
	})

	if err != nil {
		panic(err)
	}
}

func ExtractClipExample() {
	err := core.ExtractClip(core.ExtractClipInput{
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
	err := core.EncodeVideo(core.EncodeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-encoded.mp4",
	})

	if err != nil {
		panic(err)
	}
}

func GetFpsExample() {
	fps, err := core.GetFPS("/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4")
	if err != nil {
		panic(err)
	}

	println(fps)
}

func GetMomentExample() {
	moment, err := core.FindMoment(core.FindMomentInput{
		Kind:           core.VIDEO,
		Fps:            30,
		FrameCount:     100,
		DurationFrames: 40,
	})
	if err != nil {
		panic(err)
	}
	println(moment.StartFrame)
	println(moment.EndFrame)
}
