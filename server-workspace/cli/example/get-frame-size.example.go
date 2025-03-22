package example

import "quickreel.com/core/clipinfo"

func GetFrameSizeExample() {
	frameSize, err := clipinfo.GetFrameSize("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameSize.Width)
	println(frameSize.Height)
}
