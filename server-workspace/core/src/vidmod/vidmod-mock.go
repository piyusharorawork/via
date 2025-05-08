package vidmod

import (
	"context"

	"quickreel.com/core/src/model"
)

type MockVideoModifier struct {
	ConvertToMp4Called   bool
	MuteVideoCalled      bool
	CompressVideoCalled  bool
	KeyFrameEncodeCalled bool
}

func (m *MockVideoModifier) ConvertToMp4(ctx context.Context) error {
	m.ConvertToMp4Called = true
	return nil
}

func (m *MockVideoModifier) MuteVideo(ctx context.Context) error {
	m.MuteVideoCalled = true
	return nil
}

func (m *MockVideoModifier) CompressVideo(ctx context.Context, resolution model.Resolution) error {
	m.CompressVideoCalled = true
	return nil
}

func (m *MockVideoModifier) KeyFrameEncode(ctx context.Context) error {
	m.KeyFrameEncodeCalled = true
	return nil
}
