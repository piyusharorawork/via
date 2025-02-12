package example

import (
	"log"

	"quick-reel.com/core"
)

func DownloadAudioExample() {
	input := core.DownloadAudioInput{
		WebsiteUrl: "https://www.renderforest.com/template/luxurious-hotel-highlights-reel",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-music.mp3",
	}

	err := core.DownloadAudio(input)
	if err != nil {
		log.Fatalf("Failed to download audio: %v", err)
		panic(err)
	}
}
