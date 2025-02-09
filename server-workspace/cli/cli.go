package main

import videoinfo "quick-reel.com/vidfx/video-info"

func main() {

	// clipVideoInput := videoclipper.ClipVideoInput{
	// 	VideoPath:  "video.mp4",
	// 	OutputPath: "output.mp4",
	// 	Start:      0,
	// 	End:        10,
	// }

	// videoclipper.ClipVideo(clipVideoInput)

	videoPath := "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4"

	res := videoinfo.GetFrameSize(videoPath)

	println(res.Width)

}
