package clipinfo

type IClipInfo interface {
	GetFPS() (int, error)
}

type ClipInfo struct {
	VideoPath string
}

func (clipInfo *ClipInfo) GetFPS() (int, error) {
	return getFPS(clipInfo.VideoPath)
}

type MockClipInfo struct {
	fps int
}

func (clipInfo *MockClipInfo) GetFPS() (int, error) {
	return clipInfo.fps, nil
}
