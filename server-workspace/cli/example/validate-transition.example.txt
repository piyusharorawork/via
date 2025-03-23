package example

import (
	"context"

	"quickreel.com/core/workflow"
)

func ValidateTransitionExample(ctx context.Context) {
	layers := getLayers()

	input := workflow.ValidateTransitionInput{
		TemplateVideoUrl:    "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music-video-720p.mp4",
		Layers:              layers,
		TransitionsJSONPath: "/Users/piyusharora/projects/via/web-workspace/apps/quick-reel-next/data/transitions.json",
	}

	url, err := workflow.ValidateTransition(ctx, input)

	if err != nil {
		panic(err)
	}

	print(url)
}
