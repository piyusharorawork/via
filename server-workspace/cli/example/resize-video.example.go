package example

import "quick-reel.com/core"

func ResizeVideoExample() {

	input := core.ResizeVideoInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-without-music.mp4",
		Resolution: core.VERY_LOW_SD_360p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/luxurious-hotel-highlights-reel-original-without-music-360p.mp4",
	}

	err := core.ResizeVideo(input)
	if err != nil {
		panic(err)
	}

}
