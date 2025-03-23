package example

import (
	"context"

	"quickreel.com/core/extracter"
	"quickreel.com/core/model"
)

func ExtractImageExample(ctx context.Context) {

	err := extracter.ExtractImage(extracter.ExtractImageInput{
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.mp4",
		Frame:      324,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/some-image.png",
	})

	if err != nil {
		panic(err)
	}
}

func ExtractResolutionImageExample(ctx context.Context) {

	err := extracter.ExtractResolutionImage(extracter.ExtractResolutionImageInput{
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.mp4",
		Frame:      324,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/some-image.png",
		Resolution: model.BARE_MINIMUM_SD_90p,
	})

	if err != nil {
		panic(err)
	}
}
