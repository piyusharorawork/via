package example

import "quickreel.com/core/extracter"

func ExtractClipExample() {
	err := extracter.ExtractClip(extracter.ExtractClipInput{
		VideoPath:  "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
		Start:      379,
		End:        392,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-1.mp4",
		Fps:        30,
	})

	if err != nil {
		panic(err)
	}
}
