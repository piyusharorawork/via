package momentFinder

import (
	"errors"
	"math/rand"
	"time"
)

type MomentKind string

const (
	IMAGE MomentKind = "IMAGE"
	VIDEO MomentKind = "VIDEO"
)

type FindMomentInput struct {
	Kind           MomentKind
	Fps            int
	FrameCount     int
	DurationFrames int
}

type FindMomentOutput struct {
	StartFrame int
	EndFrame   int
}

func FindMoment(input FindMomentInput) (FindMomentOutput, error) {
	if input.FrameCount <= 0 {
		return FindMomentOutput{}, errors.New("frame count must be greater than 0")
	}

	if input.FrameCount <= input.DurationFrames && input.Kind == VIDEO {
		return FindMomentOutput{}, errors.New("frame count is less than duration frames")
	}

	if input.Kind == VIDEO && input.DurationFrames <= 0 {
		return FindMomentOutput{}, errors.New("duration frames must be greater than 0")
	}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	if input.Kind == IMAGE {
		randFrame := r.Intn(input.FrameCount) + 1
		return FindMomentOutput{StartFrame: randFrame, EndFrame: randFrame}, nil
	}

	randFrame := r.Intn(input.FrameCount-input.DurationFrames) + 1
	return FindMomentOutput{StartFrame: randFrame, EndFrame: randFrame + input.DurationFrames}, nil

}
