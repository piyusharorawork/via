package example

import "quick-reel.com/core"

func ResizeVideoExample() {

	input := core.ResizeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/rishikesh-room.mp4",
		Resolution: core.HD_720p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-room-720p.mp4",
	}

	err := core.ResizeVideo(input)
	if err != nil {
		panic(err)
	}

}
