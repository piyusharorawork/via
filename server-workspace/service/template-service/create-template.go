package templateservice

import (
	"context"
	"fmt"
)

type CreateTemplateInput struct {
	Name       string
	WebsiteUrl string
}

func createTemplate(ctx context.Context, mediaCreator IMediaCreator, input CreateTemplateInput) (string, error) {

	videoUrl, audioUrl, err := createVideoAudioUrls(ctx, mediaCreator, input.WebsiteUrl)

	if err != nil {
		return "", err
	}

	fmt.Println(videoUrl)
	fmt.Println(audioUrl)
	return "", nil

}

func createVideoAudioUrls(ctx context.Context, mediaCreator IMediaCreator, websiteUrl string) (string, string, error) {
	videoChannel := make(chan struct {
		url string
		err error
	})

	audioChannel := make(chan struct {
		url string
		err error
	})

	go func() {
		url, err := mediaCreator.CreateVideoUrl(ctx, websiteUrl)
		videoChannel <- struct {
			url string
			err error
		}{url, err}
	}()

	go func() {
		url, err := mediaCreator.CreateAudioUrl(ctx, websiteUrl)
		audioChannel <- struct {
			url string
			err error
		}{url, err}
	}()

	videoResult := <-videoChannel
	audioResult := <-audioChannel

	if videoResult.err != nil {
		return "", "", videoResult.err
	}

	if audioResult.err != nil {
		return "", "", audioResult.err
	}

	return videoResult.url, audioResult.url, nil

}
