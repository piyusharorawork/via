package example

import (
	"context"

	model "quick-reel.com/models"
	workflow "quick-reel.com/workflow"
)

func GenerateMediaExample(ctx context.Context) {
	layers := getLayers()

	input := workflow.GenerateMediaInput{
		OriginalVideoUrl: "https://test-v1.blr1.digitaloceanspaces.com/temp/taj-mahal-720p.mp4",
		Layers:           layers,
		LayersJSONPath:   "/Users/piyusharora/projects/via/web-workspace/apps/quick-reel-next/data/layers.json",
		VideoName:        "tag-mahal",
	}

	url, err := workflow.GenerateMedia(ctx, input)
	if err != nil {
		panic(err)
	}

	print(url)
}

func getLayers() []*model.Layer {
	return []*model.Layer{
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   27,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 28,
					End:   57,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 58,
					End:   61,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 62,
					End:   63,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 64,
					End:   66,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 67,
					End:   69,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 70,
					End:   72,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 73,
					End:   75,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 76,
					End:   78,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 79,
					End:   81,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 82,
					End:   84,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 85,
					End:   87,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 88,
					End:   90,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 91,
					End:   93,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 94,
					End:   96,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 97,
					End:   99,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 100,
					End:   102,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 103,
					End:   105,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 106,
					End:   108,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 109,
					End:   126,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 127,
					End:   172,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 173,
					End:   212,
					Content: &model.SegmentContent{
						Type: "dissolve", // todo dissolve
					},
				},
				{
					Start: 213,
					End:   246,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 247,
					End:   258,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 259,
					End:   272,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 273,
					End:   285,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 286,
					End:   299,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 300,
					End:   312,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 313,
					End:   326,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 327,
					End:   363,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0.7,
						},
					},
				},
				{
					Start: 364,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0.7,
						},
					},
				},
			},
		},
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   341,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 342,
					End:   378,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0,
						},
					},
				},
				{
					Start: 379,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0,
						},
					},
				},
			},
		},
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   353,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 354,
					End:   392,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      -0.7,
						},
					},
				},
				{
					Start: 393,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      -0.7,
						},
					},
				},
			},
		},
	}

}
