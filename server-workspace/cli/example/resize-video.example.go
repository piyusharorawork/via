package example

import "quick-reel.com/core"

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
