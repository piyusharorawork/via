package clipinfo

type IClipInfo interface {
	GetFPS() (int, error)
	GetFrameCount() (int, error)
	GetFrameSize() (*FrameSize, error)
}

type FrameSize struct {
	Width  int
	Height int
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

func (clipInfo *ClipInfo) GetFrameSize() (*FrameSize, error) {
	return getFrameSize(clipInfo.VideoPath)
}
