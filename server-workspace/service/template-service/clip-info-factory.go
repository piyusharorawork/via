package templateservice

import "quickreel.com/core/clipinfo"

type IClipInfoFactory interface {
	New(videoPath string) clipinfo.IClipInfo
}

type ClipInfoFactory struct {
}

func (clipInfoFactory *ClipInfoFactory) New(videoPath string) clipinfo.IClipInfo {
	return &clipinfo.ClipInfo{
		VideoPath: videoPath,
	}
}
