package example

import "quick-reel.com/core"

func GetFrameCountExample() {
	frameCount, err := core.GetFrameCount("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameCount)
}
