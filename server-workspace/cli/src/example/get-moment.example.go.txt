package example

import "quickreel.com/core/moment"

func GetMomentExample() {
	moment, err := moment.FindMoment(moment.FindMomentInput{
		Kind:           moment.VIDEO,
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
