package core

import (
	"os/exec"
	"strings"
	"testing"

	"quick-reel.com/util"
)

func TestFfmpeg(t *testing.T) {
	cmd := exec.Command("ffmpeg", "-version")
	out, err := util.RunCommand(cmd)

	if err != nil {
		t.Fatal(err)
	}

	if !strings.Contains(out, "ffmpeg version 7.0.1") {
		t.Fatal("ffmpeg version not found")
	}

}

func TestFFProbe(t *testing.T) {
	cmd := exec.Command("ffprobe", "-version")
	out, err := util.RunCommand(cmd)

	if err != nil {
		t.Fatal(err)
	}

	if !strings.Contains(out, "ffprobe version 7.0.1") {
		t.Fatal("ffprobe version not found")
	}

}

func TestYTDL(t *testing.T) {
	cmd := exec.Command("yt-dlp_macos", "--version")
	out, err := util.RunCommand(cmd)

	if err != nil {
		t.Fatal(err)
	}

	if !strings.Contains(out, "2025.01.26") {
		t.Fatal("yt-dlp version not found")
	}
}
