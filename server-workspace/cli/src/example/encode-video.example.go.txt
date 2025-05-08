package example

import "quickreel.com/core/vidmod"

func EncodeVideoExample() {
	err := vidmod.EncodeVideo(vidmod.EncodeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-encoded.mp4",
	})

	if err != nil {
		panic(err)
	}
}
