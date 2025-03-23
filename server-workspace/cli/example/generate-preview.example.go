package example

import (
	"context"
	"fmt"

	"github.com/schollz/progressbar/v3"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
	"quickreel.com/core/workflow"
)

func GeneratePreviewExample(ctx context.Context) {
	layers := getPreviewLayers()

	bar := progressbar.Default(100)

	input := workflow.GeneratePreviewInput{
		Layers:         layers,
		PreviewDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-preview",
		Callback: func(progress int) {
			// fmt.Printf("progress: %d\n", progress)
			bar.Set(progress)
			// bar.Add(progress)
		},
	}

	duration := util.TimeTaken(func() {
		err := workflow.GeneratePreview(ctx, input)
		if err != nil {
			panic(err)
		}
	})

	fmt.Println("Time taken:", duration)

}

func getPreviewLayers() []*model.Layer {
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/dcb6b4e9-b0b2-4a93-a2df-c977313f6ce1.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/aae79f0e-2833-4556-8d7f-b443bf6fe72e.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/99c70f71-6c35-4105-9c3f-bed7e8db3eb2.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/961a3b2a-fbe0-416c-bf73-92e136031780.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/1d1acf83-a9e9-4e9a-a943-96c4d9f13cde.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/8e59d103-4353-40d3-b69f-aca580ff3f5f.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/86f859bf-a276-4f2e-a4e3-d740aef2c3f8.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/dca08a82-162f-43bb-8f1e-fbce0f121339.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/cc9967e4-8afe-4b34-a222-9f84e7db0a90.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/e2a9ba63-5f16-4bcd-8c31-07ac32b13105.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/55111db8-85b2-471a-898f-e2313476bdeb.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/d247ca79-c9e2-4e17-898b-931dfa7340b2.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/24a794c1-a811-432d-985b-a6dc2c62224f.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/63db3f17-1f2c-4729-a788-f6307c724a3e.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/dd4ffa55-103b-41eb-ad8c-22a0b4c51979.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/845d9b2e-ea7d-47a8-9b58-be76579b7eba.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/ecd76f8f-401d-4a9f-a600-3cdac30889cd.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/76bebd61-a9ab-45d3-a99a-d6761c5ba703.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/0f6d435a-074f-4211-9977-54ee056d801f.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/e296dec8-77ae-435f-8d24-5caea6de1bfd.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/9e59263b-2533-4052-b049-faf5971d9a2c.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/0a277f97-f4d6-4ab7-bc7d-f6b8989f08b0.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/3986f252-c3ee-40cb-89b6-1246bb63e5b9.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/23fcfb28-2c01-4b58-862f-84972d984811.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/3692c0cf-710a-4590-80c3-99e19cc9c693.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/e3fa0795-54d1-43db-96b0-c6c9de256ba6.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/b6ec0d4a-a0cd-4d9c-b27d-0dd55642f84e.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/43838c0b-a1f0-4924-9595-b1c337fb081c.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/88869271-1d93-4217-8c81-a6534cd0378a.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/e2a9ba63-5f16-4bcd-8c31-07ac32b13105.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/fa79b75d-2889-4f09-9df8-5cc35695993a.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/fa79b75d-2889-4f09-9df8-5cc35695993a.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/fa79b75d-2889-4f09-9df8-5cc35695993a.webm",
					},
				},
			},
		},
	}
}
