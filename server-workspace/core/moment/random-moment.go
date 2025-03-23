package moment

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
	RequiredFrames int
	TotalFrames    int
}

type FindMomentOutput struct {
	Start int
	End   int
}

func FindMoment(input FindMomentInput) (*FindMomentOutput, error) {
	if input.RequiredFrames <= 0 {
		return nil, errors.New("required frames must be greater than 0")
	}

	if input.RequiredFrames >= input.TotalFrames && input.Kind == VIDEO {
		return nil, errors.New("frame count is less than duration frames")
	}

	if input.Kind == VIDEO && input.RequiredFrames <= 0 {
		return nil, errors.New("duration frames must be greater than 0")
	}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	if input.Kind == IMAGE {
		randFrame := r.Intn(input.TotalFrames) + 1
		return &FindMomentOutput{Start: randFrame, End: randFrame}, nil
	}

	randFrame := r.Intn(input.TotalFrames - input.RequiredFrames - 1)
	return &FindMomentOutput{Start: randFrame, End: randFrame + input.RequiredFrames - 1}, nil

}
