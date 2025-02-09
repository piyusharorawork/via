package videoclipper

import (
	"bytes"
	"os/exec"
)

type ClipVideoInput struct {
	VideoPath  string
	OutputPath string
	Start      int
	End        int
}

func ClipVideo(input ClipVideoInput) {
	cmd := exec.Command("ffmpeg", "-version")

	var stdout, stderr bytes.Buffer

	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		println("ffmpeg not found")
		println(stderr.String())
		panic(err)
	}

	println(stdout.String())

}
