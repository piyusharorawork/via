package clipinfo

type IClipInfoFactory interface {
	New(videoPath string) IClipInfo
}

type ClipInfoFactory struct {
}

func (clipInfoFactory *ClipInfoFactory) New(videoPath string) IClipInfo {
	return &ClipInfo{
		VideoPath: videoPath,
	}
}
