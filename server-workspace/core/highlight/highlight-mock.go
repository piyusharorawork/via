package highlight

type MockHighlight struct {
	ForVideoCalled  bool
	ForImageCalled  bool
	OutputTimeFrame *TimeFrame
}

func (m *MockHighlight) ForVideo(requiredFrames int) (*TimeFrame, error) {
	m.ForVideoCalled = true
	return m.OutputTimeFrame, nil
}

func (m *MockHighlight) ForImage() (*TimeFrame, error) {
	m.ForImageCalled = true
	return m.OutputTimeFrame, nil
}
