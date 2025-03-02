package example

import "quick-reel.com/core"

func AttachAudioExample() {
	err := core.AttachAudio(core.AttachAudioInput{
		AudioPath:  "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music.mp3",
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/rishikesh-output.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-room-with-audio.mp4",
	})

	if err != nil {
		panic(err)
	}

}
