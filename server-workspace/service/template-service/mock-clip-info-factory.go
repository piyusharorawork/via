package templateservice

import "quickreel.com/core/clipinfo"

type MockClipInfoFactory struct {
	Fps        int
	FrameCount int
}

func (clipInfoFactory *MockClipInfoFactory) New(videoPath string) clipinfo.IClipInfo {
	return &clipinfo.MockClipInfo{
		Fps:        clipInfoFactory.Fps,
		FrameCount: clipInfoFactory.FrameCount,
	}
}
