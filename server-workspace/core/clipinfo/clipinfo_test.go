package clipinfo

import "testing"

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

			got, err := clipInfo.GetFPS()
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

			got, err := clipInfo.GetFrameCount()
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
