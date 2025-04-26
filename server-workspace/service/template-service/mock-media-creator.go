package templateservice

import "context"

type MockMediaCreator struct {
	CreateVideoUrlCalled bool
	VideoUrl             string
	CreateAudioUrlCalled bool
	AudioUrl             string
}

func (creator *MockMediaCreator) CreateVideoUrl(ctx context.Context, websiteUrl string) (string, error) {
	creator.CreateVideoUrlCalled = true
	return creator.VideoUrl, nil
}

func (creator *MockMediaCreator) CreateAudioUrl(ctx context.Context, websiteUrl string) (string, error) {
	creator.CreateAudioUrlCalled = true
	return creator.AudioUrl, nil
}
