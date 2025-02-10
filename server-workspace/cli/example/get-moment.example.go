package example

import "quick-reel.com/core"

func GetMomentExample() {
	moment, err := core.FindMoment(core.FindMomentInput{
		Kind:           core.VIDEO,
		Fps:            30,
		FrameCount:     100,
		DurationFrames: 40,
	})
	if err != nil {
		panic(err)
	}
	println(moment.StartFrame)
	println(moment.EndFrame)
}
