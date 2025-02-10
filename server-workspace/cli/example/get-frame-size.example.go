package example

import "quick-reel.com/core"

func GetFrameSizeExample() {
	frameSize, err := core.GetFrameSize("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameSize.Width)
	println(frameSize.Height)
}
