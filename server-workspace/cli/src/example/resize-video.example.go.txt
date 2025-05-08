package example

import (
	"quickreel.com/core/model"
	"quickreel.com/core/vidmod"
)

func ResizeVideoExample() {

	input := vidmod.ResizeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/taj-mahal.mp4",
		Resolution: model.HD_720p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/taj-mahal-720p.mp4",
	}

	err := vidmod.ResizeVideo(input)
	if err != nil {
		panic(err)
	}

}
