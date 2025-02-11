package example

import (
	"context"

	model "quick-reel.com/models"
	"quick-reel.com/workflow"
)

func GenerateMediaExample(ctx context.Context) {
	input := workflow.GenerateMediaInput{
		OriginalVideoUrl: "https://test-v1.blr1.digitaloceanspaces.com/rishikesh-sample-720p.mp4",
		Transitions:      []model.Transition{},
		OutputFilePath:   "/Users/piyusharora/projects/via/assets/temp/hotel-highlight-reel-original-resized.mp4",
	}

	err := workflow.GenerateMedia(ctx, input)
	if err != nil {
		panic(err)
	}
}
