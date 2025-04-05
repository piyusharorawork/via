package example

import "quickreel.com/core/extracter"

func ExtractClipExample() {
	err := extracter.ExtractClip(extracter.ExtractClipInput{
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/taj-mahal-720p.mp4",
		Start:      1,
		End:        27,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/taj-mahal-720p-1-27.mp4",
		Fps:        30,
	})

	if err != nil {
		panic(err)
	}
}
