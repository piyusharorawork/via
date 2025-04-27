package clipinfo

type MockClipInfoFactory struct {
	Fps        int
	FrameCount int
}

func (clipInfoFactory *MockClipInfoFactory) New(videoPath string) IClipInfo {
	return &MockClipInfo{
		Fps:        clipInfoFactory.Fps,
		FrameCount: clipInfoFactory.FrameCount,
	}
}
