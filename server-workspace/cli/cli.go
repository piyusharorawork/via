package main

import (
	"quick-reel.com/cli/example"
)

func main() {

	ctx, err := createCtx()

	if err != nil {
		panic(err)
	}

	println(ctx)

	example.ResizeImageExample()
}
