package highlight

import (
	"errors"
	"testing"

	"quickreel.com/core/src/util"
)

func TestRandomHighlightForVideo(t *testing.T) {
	tt := []struct {
		name           string
		frameCount     int
		requiredFrames int
		wantErr        error
	}{
		{
			name:           "not enough frames",
			frameCount:     100,
			requiredFrames: 200,
			wantErr:        errors.New(NOT_ENOUGH_FRAMES_ERROR),
		},
		{
			name:           "exact frames",
			frameCount:     100,
			requiredFrames: 100,
			wantErr:        nil,
		},
		{
			name:           "appropriate frames",
			frameCount:     100,
			requiredFrames: 50,
			wantErr:        nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			highlight := RandomHighlight{
				FrameCount: tc.frameCount,
			}

			timeFrame, err := highlight.ForVideo(tc.requiredFrames)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("ForVideo() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil {
				duration := timeFrame.End - timeFrame.Start + 1
				if duration != tc.requiredFrames {
					t.Fatalf("duration is not equal")
				}

				if timeFrame.Start >= tc.frameCount {
					t.Fatalf("start is not less than frame count")
				}

				if timeFrame.End >= tc.frameCount {
					t.Fatalf("end is not less than frame count")
				}
			}

		})

	}

}

func TestRandomHighlightForImage(t *testing.T) {
	tt := []struct {
		name       string
		frameCount int
		wantErr    error
	}{
		{
			name:       "empty video",
			frameCount: 0,
			wantErr:    errors.New(EMPTY_VIDEO_ERROR),
		},
		{
			name:       "exact frames",
			frameCount: 100,
			wantErr:    nil,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			highlight := RandomHighlight{
				FrameCount: tc.frameCount,
			}

			timeFrame, err := highlight.ForImage()

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("ForImage() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil {
				if timeFrame.Start != timeFrame.End {
					t.Fatalf("start is not equal to end")
				}

				if timeFrame.Start >= tc.frameCount {
					t.Fatalf("start is not less than frame count")
				}
			}

		})

	}

}
