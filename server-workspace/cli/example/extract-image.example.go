package example

import "quickreel.com/core/extracter"

func ExtractImageExample() {
	err := extracter.ExtractImage(extracter.ExtractImageInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Frame:      200,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.png",
	})

	if err != nil {
		panic(err)
	}
}
