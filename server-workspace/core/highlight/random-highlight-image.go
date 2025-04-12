package highlight

import (
	"errors"
	"math/rand"
	"time"
)

type RandomHighlightImageInput struct {
	FrameCount int
}

const (
	EMPTY_VIDEO_ERROR = "empty video"
)

func randomHighlightImage(input *RandomHighlightImageInput) (*TimeFrame, error) {
	if input.FrameCount == 0 {
		return nil, errors.New(EMPTY_VIDEO_ERROR)
	}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	frame := r.Intn(input.FrameCount - 1)

	return &TimeFrame{Start: frame, End: frame}, nil
}
