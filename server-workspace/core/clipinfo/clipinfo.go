package clipinfo

type IClipInfo interface {
	GetFPS() (int, error)
	GetFrameCount() (int, error)
}

type ClipInfo struct {
	VideoPath string
}

func (clipInfo *ClipInfo) GetFPS() (int, error) {
	return getFPS(clipInfo.VideoPath)
}

func (clipInfo *ClipInfo) GetFrameCount() (int, error) {
	return getFrameCount(clipInfo.VideoPath)
}
