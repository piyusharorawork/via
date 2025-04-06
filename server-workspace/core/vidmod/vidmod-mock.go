package vidmod

import "context"

type VideoModifierMock struct {
}

func (m *VideoModifierMock) ConvertToMp4(ctx context.Context) error {
	return nil
}
