package extractor

import "context"

type MockExtractor struct {
	ExtractImageCalled bool
	ExtractClipCalled  bool
}

func (m *MockExtractor) ExtractImage(ctx context.Context, frameNo int) error {
	m.ExtractImageCalled = true
	return nil
}

func (m *MockExtractor) ExtractClip(ctx context.Context, startFrameNo int, endFrameNo int, fps int) error {
	m.ExtractClipCalled = true
	return nil
}
