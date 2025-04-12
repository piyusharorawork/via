package highlight

type IHighlight interface {
	ForVideo(requiredFrames int) (TimeFrame, error)
	ForImage() (TimeFrame, error)
}

type TimeFrame struct {
	Start int
	End   int
}

type RandomHighlight struct {
	FrameCount int
}

func (highlight *RandomHighlight) ForVideo(requiredFrames int) (*TimeFrame, error) {
	input := RandomHighlightVideoInput{
		FrameCount:     highlight.FrameCount,
		RequiredFrames: requiredFrames,
	}

	return randomHighlightVideo(input)
}

func (highlight *RandomHighlight) ForImage() (*TimeFrame, error) {
	input := &RandomHighlightImageInput{
		FrameCount: highlight.FrameCount,
	}
	return randomHighlightImage(input)
}
