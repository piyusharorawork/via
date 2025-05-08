package clipinfo

import "context"

type MockClipInfo struct {
	Fps        int
	FrameCount int
	FrameSize  *FrameSize
}

func (clipInfo *MockClipInfo) GetFPS(ctx context.Context) (int, error) {
	return clipInfo.Fps, nil
}

func (clipInfo *MockClipInfo) GetFrameCount(ctx context.Context) (int, error) {
	return clipInfo.FrameCount, nil
}

func (clipInfo *MockClipInfo) GetFrameSize(ctx context.Context) (*FrameSize, error) {
	return clipInfo.FrameSize, nil
}
