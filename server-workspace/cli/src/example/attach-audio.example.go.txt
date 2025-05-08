package example

import (
	"quickreel.com/core/vidmod"
)

func AttachAudioExample() {
	err := vidmod.AttachAudio(vidmod.AttachAudioInput{
		AudioPath:  "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music.mp3",
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/tag-mahal-output.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/tag-mahal-output-with-audio.mp4",
	})

	if err != nil {
		panic(err)
	}

}
