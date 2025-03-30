package clipinfo

import (
	"context"
	"reflect"
	"testing"

	"quickreel.com/core/model"
)

func TestGetFPS(t *testing.T) {
	tt := []struct {
		name      string
		videoPath string
		want      int
	}{
		{
			name:      "30 fps",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/beach-30fps.mp4",
			want:      30,
		},
		{
			name:      "24 fps",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/big-buck-bunny-480p-30sec.mp4",
			want:      24,
		},
		{
			name:      "60 fps",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/big-buck-bunny-1080p-60fps-30sec.mp4",
			want:      60,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			clipInfo := &ClipInfo{
				VideoPath: tc.videoPath,
			}

			ctx := getTestContext()
			got, err := clipInfo.GetFPS(ctx)
			if err != nil {
				t.Fatalf("GetFPS() error = %v", err)
				return
			}
			if got != tc.want {
				t.Fatalf("GetFPS() = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestGetFrameCount(t *testing.T) {
	tt := []struct {
		name      string
		videoPath string
		want      int
	}{
		{
			name:      "720 frame count",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/big-buck-bunny-480p-30sec.mp4",
			want:      720,
		},
		{
			name:      "301 frame count",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/10-secs.mp4",
			want:      301,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			clipInfo := &ClipInfo{
				VideoPath: tc.videoPath,
			}
			ctx := getTestContext()
			got, err := clipInfo.GetFrameCount(ctx)
			if err != nil {
				t.Fatalf("GetFrameCount() error = %v", err)
				return
			}
			if got != tc.want {
				t.Fatalf("GetFrameCount() = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestGetFrameSize(t *testing.T) {
	tt := []struct {
		name      string
		videoPath string
		want      *FrameSize
	}{
		{
			name:      "480p Landscape Frame Size ",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/big-buck-bunny-480p-30sec.mp4",
			want: &FrameSize{
				Width:  854,
				Height: 480,
			},
		},
		{
			name:      "1080p Landscape Frame Size ",
			videoPath: "https://test-v1.blr1.digitaloceanspaces.com/media/big-buck-bunny-1080p-30sec.mp4",
			want: &FrameSize{
				Width:  1920,
				Height: 1080,
			},
		},
	}

	for _, tc := range tt {

		t.Run(tc.name, func(t *testing.T) {
			clipInfo := &ClipInfo{
				VideoPath: tc.videoPath,
			}

			ctx := getTestContext()
			got, err := clipInfo.GetFrameSize(ctx)
			if err != nil {
				t.Fatalf("GetFrameSize() error = %v", err)
				return
			}

			if !reflect.DeepEqual(got, tc.want) {
				t.Fatalf("GetFrameSize() = %v, want %v", got, tc.want)
			}

		})
	}
}

func getTestContext() context.Context {
	ctx := context.Background()
	ctx = context.WithValue(ctx, model.FFProbePath, "/Users/piyusharora/projects/via/bin/ffprobe")
	return ctx
}
