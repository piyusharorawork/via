package workflow

import model "quick-reel.com/models"

type GenerateMediaInput struct {
	VideoPath      string
	Transitions    []model.Transition
	OutputFilePath string
}

func GenerateMedia(input GenerateMediaInput) error {
	return nil
}
