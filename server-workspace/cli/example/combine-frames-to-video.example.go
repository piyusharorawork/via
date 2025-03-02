package example

import "quick-reel.com/core"

func CombineFramesToVideoExample() {
	core.ConvertFramesToVideo(core.ConvertFramesToVideoInput{
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		OutputPath:    "/Users/piyusharora/projects/via/assets/temp/rishikesh-output1.mp4",
		Fps:           30,
	})
}
