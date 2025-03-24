package example

import (
	"context"
	"log"

	"quickreel.com/core/downloader"
)

func DownloadVideoExample(ctx context.Context) {
	err := downloader.DownloadVideo(downloader.DownloadVideoInput{
		VideoURL:   "https://www.youtube.com/watch?v=tCDvOQI3pco",
		OutputPath: "/Users/piyusharora/projects/via/assets/sample-videos/10-secs.mp4",
	})

	if err != nil {
		log.Fatalf("Failed to download video: %v", err)
		panic(err)
	}
}
