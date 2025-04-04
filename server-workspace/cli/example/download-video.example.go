package example

import (
	"log"

	"quickreel.com/core/downloader"
)

func DownloadVideoExample() {
	err := downloader.DownloadVideo(downloader.DownloadVideoInput{
		VideoURL:   "https://www.renderforest.com/template/luxurious-hotel-highlights-reel",
		OutputPath: "/Users/piyusharora/projects/via/assets/sample-videos/cms/luxurious-hotel-highlights-reel-original.mp4",
	})

	if err != nil {
		log.Fatalf("Failed to download video: %v", err)
		panic(err)
	}
}
