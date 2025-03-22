package example

import (
	"quickreel.com/core/imgmod"
	"quickreel.com/core/model"
)

func ResizeImageExample() {
	err := imgmod.ResizeImage(imgmod.ResizeImageInput{
		ImagePath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-29ac7efe-66fe-458a-a2e4-90d6b7b9a43a/2d964491-488f-4ae7-a68f-0489b7d0413a.png",
		Resolution: model.BARE_MINIMUM_SD_90p,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/low.png",
	})

	if err != nil {
		panic(err)
	}
}
