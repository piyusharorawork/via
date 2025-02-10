package example

import (
	model "quick-reel.com/models"
	"quick-reel.com/workflow"
)

func GenerateMediaExample() {
	input := workflow.GenerateMediaInput{
		VideoPath:      "/Users/piyusharora/projects/via/assets/sample-videos/hotel-highlight-reel-original.mp4",
		Transitions:    []model.Transition{},
		OutputFilePath: "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
	}

	err := workflow.GenerateMedia(input)
	if err != nil {
		panic(err)
	}
}
