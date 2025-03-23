package example

import (
	"context"

	"quickreel.com/core/clipinfo"
)

func GetFpsExample(ctx context.Context) {
	fps, err := clipinfo.GetFPS("https://test-v1.blr1.digitaloceanspaces.com/temp/7c49aaaa-6745-4ae0-b3c4-8c523bb0ede1.webm")
	if err != nil {
		panic(err)
	}

	println(fps)
}
