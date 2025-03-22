package example

import "quickreel.com/core/clipinfo"

func GetFpsExample() {
	fps, err := clipinfo.GetFPS("/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4")
	if err != nil {
		panic(err)
	}

	println(fps)
}
