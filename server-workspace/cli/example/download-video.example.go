package example

import (
	"log"

	"quick-reel.com/core"
)

func DownloadVideoExample() {
	err := core.DownloadVideo(core.DownloadVideoInput{
		VideoURL:   "https://www.youtube.com/shorts/xuwJ81E2lX8",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/pondi-shorts.mp4",
	})

	if err != nil {
		log.Fatalf("Failed to download video: %v", err)
		panic(err)
	}
}
