package example

import (
	"context"

	model "quick-reel.com/models"
	workflow "quick-reel.com/workflow"
)

func GenerateMediaExample(ctx context.Context) {
	input := workflow.GenerateMediaInput{
		OriginalVideoUrl: "https://test-v1.blr1.digitaloceanspaces.com/temp/97e97514-0491-4523-9fa1-5fae74854916/pondi-shorts.mp4",
		Transitions:      []model.Transition{},
		OutputFilePath:   "/Users/piyusharora/projects/via/assets/temp/media.json",
	}

	err := workflow.GenerateMedia(ctx, input)
	if err != nil {
		panic(err)
	}
}
