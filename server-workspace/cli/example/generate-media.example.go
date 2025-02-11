package example

import (
	"context"

	model "quick-reel.com/models"
	workflow "quick-reel.com/workflow"
)

func GenerateMediaExample(ctx context.Context) {
	input := workflow.GenerateMediaInput{
		OriginalVideoUrl: "https://test-v1.blr1.digitaloceanspaces.com/need-to-find",
		Transitions:      []model.Transition{},
		OutputFilePath:   "/Users/piyusharora/projects/via/assets/temp/media.json",
	}

	err := workflow.GenerateMedia(ctx, input)
	if err != nil {
		panic(err)
	}
}
