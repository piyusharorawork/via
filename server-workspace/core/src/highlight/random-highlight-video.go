package highlight

import (
	"errors"
	"math/rand"
	"time"
)

type RandomHighlightVideoInput struct {
	FrameCount     int
	RequiredFrames int
}

const (
	NOT_ENOUGH_FRAMES_ERROR = "not enough frames"
)

func randomHighlightVideo(input RandomHighlightVideoInput) (*TimeFrame, error) {
	if input.RequiredFrames > input.FrameCount {
		return nil, errors.New(NOT_ENOUGH_FRAMES_ERROR)
	}

	if input.RequiredFrames == input.FrameCount {
		return &TimeFrame{Start: 0, End: input.FrameCount - 1}, nil
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	start := r.Intn(input.FrameCount - input.RequiredFrames - 1)
	end := start + input.RequiredFrames - 1
	return &TimeFrame{Start: start, End: end}, nil
}
