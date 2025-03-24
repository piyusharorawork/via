package main

import (
	"quickreel.com/cli/example"
)

func main() {

	ctx, err := createCtx()

	if err != nil {
		panic(err)
	}

	example.UploadFileExample(ctx)
}
