package example

import "quick-reel.com/core"

func EncodeVideoExample() {
	err := core.EncodeVideo(core.EncodeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-encoded.mp4",
	})

	if err != nil {
		panic(err)
	}
}
