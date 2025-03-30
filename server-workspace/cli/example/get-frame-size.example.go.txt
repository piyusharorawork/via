package example

import "quickreel.com/core/clipinfo"

func GetFrameSizeExample() {
	info := clipinfo.ClipInfo{
		VideoPath: "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
	}

	frameSize, err := info.GetFrameSize()

	if err != nil {
		panic(err)
	}

	println(frameSize.Width)
	println(frameSize.Height)
}
