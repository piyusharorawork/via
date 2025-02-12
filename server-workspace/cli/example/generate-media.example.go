package example

import (
	"context"

	model "quick-reel.com/models"
	workflow "quick-reel.com/workflow"
)

func GenerateMediaExample(ctx context.Context) {
	transitions := getTransitions()

	input := workflow.GenerateMediaInput{
		OriginalVideoUrl: "https://test-v1.blr1.digitaloceanspaces.com/temp/97e97514-0491-4523-9fa1-5fae74854916/pondi-shorts.mp4",
		Transitions:      transitions,
		OutputFilePath:   "/Users/piyusharora/projects/via/assets/temp/media.json",
	}

	err := workflow.GenerateMedia(ctx, input)
	if err != nil {
		panic(err)
	}
}

func getTransitions() []model.Transition {
	return []model.Transition{
		{
			StartFrame: 1,
			EndFrame:   27,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 28,
			EndFrame:   57,
			Info: model.TransitionInfo{
				Type:    "layout",
				Grid:    model.LayoutGrid{Columns: 0, Rows: 0},
				Content: []model.LayoutContent{},
			},
		},
		{
			StartFrame: 58,
			EndFrame:   61,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 62,
			EndFrame:   63,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 64,
			EndFrame:   66,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 67,
			EndFrame:   69,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 70,
			EndFrame:   72,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 73,
			EndFrame:   75,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 76,
			EndFrame:   78,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 79,
			EndFrame:   81,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 82,
			EndFrame:   84,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 85,
			EndFrame:   87,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 88,
			EndFrame:   90,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 91,
			EndFrame:   93,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 94,
			EndFrame:   96,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 97,
			EndFrame:   99,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 100,
			EndFrame:   102,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 103,
			EndFrame:   105,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 109,
			EndFrame:   126,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 127,
			EndFrame:   172,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 173,
			EndFrame:   183,
			Info: model.TransitionInfo{
				Type: "dissolve",
			},
		},
		{
			StartFrame: 184,
			EndFrame:   218,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 219,
			EndFrame:   233,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 234,
			EndFrame:   246,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 247,
			EndFrame:   258,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 259,
			EndFrame:   272,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 273,
			EndFrame:   285,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 286,
			EndFrame:   299,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 300,
			EndFrame:   312,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 313,
			EndFrame:   326,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 1},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
		{
			StartFrame: 327,
			EndFrame:   341,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 342,
			EndFrame:   353,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 354,
			EndFrame:   363,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 364,
			EndFrame:   378,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "image",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 379,
			EndFrame:   392,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "video",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "image",
					},
				},
			},
		},
		{
			StartFrame: 393,
			EndFrame:   422,
			Info: model.TransitionInfo{
				Type: "layout",
				Grid: model.LayoutGrid{Columns: 1, Rows: 3},
				Content: []model.LayoutContent{
					{
						Row:    0,
						Column: 0,
						Kind:   "video",
					},
					{
						Row:    1,
						Column: 0,
						Kind:   "video",
					},
					{
						Row:    2,
						Column: 0,
						Kind:   "video",
					},
				},
			},
		},
	}

}
