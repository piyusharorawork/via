package clipinfo

import "context"

type IClipInfo interface {
	GetFPS(ctx context.Context) (int, error)
	GetFrameCount(ctx context.Context) (int, error)
	GetFrameSize(ctx context.Context) (*FrameSize, error)
}

type FrameSize struct {
	Width  int
	Height int
}

type ClipInfo struct {
	VideoPath string
}

func (clipInfo *ClipInfo) GetFPS(ctx context.Context) (int, error) {
	return getFPS(ctx, clipInfo.VideoPath)
}

func (clipInfo *ClipInfo) GetFrameCount(ctx context.Context) (int, error) {
	return getFrameCount(ctx, clipInfo.VideoPath)
}

func (clipInfo *ClipInfo) GetFrameSize(ctx context.Context) (*FrameSize, error) {
	return getFrameSize(ctx, clipInfo.VideoPath)
}
