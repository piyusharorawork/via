package example

import "quick-reel.com/core"

func ExtractImageExample() {
	err := core.ExtractImage(core.ExtractImageInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Frame:      200,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.png",
	})

	if err != nil {
		panic(err)
	}
}
