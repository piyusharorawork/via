package example

import "quick-reel.com/core"

func ExportFramesExample() {
	err := core.ExportFrames(core.ExportFramesInput{
		FrameCount:    400,
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		PageUrl:       "http://localhost:3000/project",
		VideoWidth:    360,
		VideoHeight:   640,
	})

	if err != nil {
		panic(err)
	}

}
