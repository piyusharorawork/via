package vidmod

import "context"

type MockVideoModifier struct {
}

func (m *MockVideoModifier) ConvertToMp4(ctx context.Context) error {
	return nil
}

func (m *MockVideoModifier) MuteVideo(ctx context.Context) error {
	return nil
}
