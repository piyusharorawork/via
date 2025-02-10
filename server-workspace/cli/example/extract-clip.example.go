package example

import "quick-reel.com/core"

func ExtractClipExample() {
	err := core.ExtractClip(core.ExtractClipInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		StartFrame: 379,
		EndFrame:   392,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.mp4",
		Fps:        30,
	})

	if err != nil {
		panic(err)
	}
}
