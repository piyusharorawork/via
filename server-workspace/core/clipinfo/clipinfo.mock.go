package clipinfo

type MockClipInfo struct {
	Fps        int
	FrameCount int
	FrameSize  *FrameSize
}

func (clipInfo *MockClipInfo) GetFPS() (int, error) {
	return clipInfo.Fps, nil
}

func (clipInfo *MockClipInfo) GetFrameCount() (int, error) {
	return clipInfo.FrameCount, nil
}

func (clipInfo *MockClipInfo) GetFrameSize() (*FrameSize, error) {
	return clipInfo.FrameSize, nil
}
