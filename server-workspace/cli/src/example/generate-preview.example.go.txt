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
			bar.Set(progress)
		},
		ShowErrors: true,
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/7780f511-7d8e-4077-a545-72cf16f4b89b.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/6ce9dedb-65fc-4ec7-8251-2212f7b61aa1.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/aa095290-e7cb-4b9d-8247-fa2271dece45.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/0b199306-5d3c-44ca-89f0-579b4a1e5b57.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/f19f0c16-d9ff-472e-835b-140c64a853a7.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/8f1e0565-6a0c-4a56-a0d8-8150726f68ab.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/10766c49-bd9a-49e2-b211-0e97cce18f6a.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/a912a8c2-84ad-4bea-a6b5-4032b9f17aee.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/4b9b9f12-890e-481e-bb5c-1779ef98d3a6.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/f98b9051-75b8-4812-88a5-d8b4b3df8aac.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/41776890-e8f4-4544-b696-727615a81fa8.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/3b1fbea5-438c-40ac-b703-106d1269e469.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/87d418f7-046f-43c6-b82f-d83b5ad9fd06.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/706e3549-6e58-4c12-9ffe-ac36b77f4599.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/7abaf6f8-ca36-4251-a768-b63b5f5f9097.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/728ff310-a9ff-4a18-8781-86d59e8aac37.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/e9e02dfa-d77f-4f69-bc3c-015aec4087ed.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/d7dd8723-1f9a-4c59-866d-50008a0c262e.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/ddd2140d-9e3f-4e7e-a16b-dd3327262a59.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/7c49aaaa-6745-4ae0-b3c4-8c523bb0ede1.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/5af8b6ce-a819-4924-a64d-4bd9797a5492.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/0c8e4b13-2121-43f8-a961-0cbae72afb71.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/d0ba50f4-be1a-48d0-9a02-59e17cb21155.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/94ee7a47-2285-485e-94b7-ffc5b01c80d8.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/5fda20d1-8394-4036-ad17-dd8ae35b6cd5.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/515646e1-c30d-40d9-a945-ef2fb35b558c.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/a6cdb995-cbfd-46dd-abfd-0d4a7eb2c866.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/7897f8a5-cae0-4210-9664-d2014e0123df.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/a50c1e33-5df0-4067-a146-b3908370f046.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/294b1f39-2dd1-45d5-a977-d0656e4c358d.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/5292d9a5-97c7-4016-a740-7523862dc9e8.webm",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/0462c650-f250-4ee0-ab2f-b601041b1b9b.png",
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
						Url: "https://test-v1.blr1.digitaloceanspaces.com/temp/8297d10c-6549-492a-81d4-1f6b2093cf5c.webm",
					},
				},
			},
		},
	}
}
