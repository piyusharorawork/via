package vidmod

import "context"

type IVideoModifier interface {
	ConvertToMp4(ctx context.Context) error
	MuteVideo(ctx context.Context) error
}

type VideoModifier struct {
	VideoPath  string
	OutputPath string
}

func (videoModifier *VideoModifier) ConvertToMp4(ctx context.Context) error {
	input := ConvertToMp4Input{
		VideoPath:  videoModifier.VideoPath,
		OutputPath: videoModifier.OutputPath,
	}
	return convertToMp4(ctx, input)
}

func (videoModifier *VideoModifier) MuteVideo(ctx context.Context) error {
	input := MuteVideoInput{
		VideoPath:  videoModifier.VideoPath,
		OutputPath: videoModifier.OutputPath,
	}
	return muteVideo(ctx, input)
}
