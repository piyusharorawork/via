package clipinfo

type MockClipInfo struct {
	Fps        int
	FrameCount int
}

func (clipInfo *MockClipInfo) GetFPS() (int, error) {
	return clipInfo.Fps, nil
}

func (clipInfo *MockClipInfo) GetFrameCount() (int, error) {
	return clipInfo.FrameCount, nil
}
