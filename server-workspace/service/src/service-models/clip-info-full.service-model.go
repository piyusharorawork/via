package servicemodels

type ClipInfoFull struct {
	Fps         int `json:"fps"`
	FrameCount  int `json:"frameCount"`
	FrameWidth  int `json:"frameWidth"`
	FrameHeight int `json:"frameHeight"`
}
