package example

import "quickreel.com/core/extracter"

func ExtractImageExample() {
	err := extracter.ExtractImage(extracter.ExtractImageInput{
		VideoPath:  "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/dcb6b4e9-b0b2-4a93-a2df-c977313f6ce1.webm",
		Frame:      1,
		OutputPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-preview/some-image.png",
	})

	if err != nil {
		panic(err)
	}
}
