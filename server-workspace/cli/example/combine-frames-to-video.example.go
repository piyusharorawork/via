package example

import "quickreel.com/core/extracter"

func CombineFramesToVideoExample() {
	extracter.ConvertFramesToVideo(extracter.ConvertFramesToVideoInput{
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		OutputPath:    "/Users/piyusharora/projects/via/assets/temp/rishikesh-output1.mp4",
		Fps:           30,
	})
}
