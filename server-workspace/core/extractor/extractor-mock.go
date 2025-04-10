package extractor

import (
	"context"

	"quickreel.com/core/model"
)

type MockExtractor struct {
	ExtractImageCalled           bool
	ExtractClipCalled            bool
	ExtractCompressedImageCalled bool
}

func (m *MockExtractor) ExtractImage(ctx context.Context, frameNo int) error {
	m.ExtractImageCalled = true
	return nil
}

func (m *MockExtractor) ExtractClip(ctx context.Context, startFrameNo int, endFrameNo int, fps int) error {
	m.ExtractClipCalled = true
	return nil
}

func (m *MockExtractor) ExtractCompressedImage(ctx context.Context, frameNo int, resolution model.Resolution) error {
	m.ExtractCompressedImageCalled = true
	return nil
}
