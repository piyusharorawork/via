package example

import (
	"context"

	"quick-reel.com/workflow"
)

func ValidateTransitionExample(ctx context.Context) {
	transitions := getTransitions()

	input := workflow.ValidateTransitionInput{
		TemplateVideoUrl:    "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music-video-720p.mp4",
		Transitions:         transitions,
		TransitionsJSONPath: "/Users/piyusharora/projects/via/web-workspace/apps/quick-reel-next/data/transitions.json",
	}

	url, err := workflow.ValidateTransition(ctx, input)

	if err != nil {
		panic(err)
	}

	print(url)
}
