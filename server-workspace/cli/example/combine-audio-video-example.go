package example

import (
	"log"

	"quick-reel.com/core"
)

func CombineAudioVideoExample() {
	input := core.CombineAudioVideoInput{
		AudioPath:  "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-music.mp3",
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-without-music.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-music-video.mp4",
	}

	err := core.CombineAudioVideo(input)
	if err != nil {
		log.Fatalf("Failed to combine audio video: %v", err)
		panic(err)
	}

}
