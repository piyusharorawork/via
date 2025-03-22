package example

import "quickreel.com/core/clipinfo"

func GetFrameCountExample() {
	frameCount, err := clipinfo.GetFrameCount("/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4")

	if err != nil {
		panic(err)
	}

	println(frameCount)
}
