package example

import "quick-reel.com/core"

func GetMomentExample() {
	moment, err := core.FindMoment(core.FindMomentInput{
		Kind:           core.VIDEO,
		Fps:            30,
		TotalFrames:    100,
		RequiredFrames: 40,
	})
	if err != nil {
		panic(err)
	}
	println(moment.Start)
	println(moment.End)
}
