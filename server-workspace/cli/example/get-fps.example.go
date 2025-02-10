package example

import "quick-reel.com/core"

func GetFpsExample() {
	fps, err := core.GetFPS("/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4")
	if err != nil {
		panic(err)
	}

	println(fps)
}
