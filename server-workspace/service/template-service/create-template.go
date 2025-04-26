package templateservice

import (
	"context"
	"fmt"
	"math"

	"github.com/google/uuid"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/extractor"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
)

const (
	PREVIEW_FRAMES_PER_SECOND = 4
)

type CreateTemplateInput struct {
	Name       string
	WebsiteUrl string
}

func createTemplate(ctx context.Context, mediaCreator IMediaCreator, clipinfoFactory IClipInfoFactory, input CreateTemplateInput) (string, error) {

	videoUrl, audioUrl, err := createVideoAudioUrls(ctx, mediaCreator, input.WebsiteUrl)

	if err != nil {
		return "", err
	}

	fmt.Println(videoUrl)
	fmt.Println(audioUrl)

	fps, frameCount, err := getFpsAndFrameCount(ctx, clipinfoFactory, videoUrl)

	if err != nil {
		return "", err
	}

	fmt.Println(fps)
	fmt.Println(frameCount)

	previewFrames, err := generatePreviewFrames(ctx, videoUrl, fps, frameCount)

	if err != nil {
		return "", err
	}

	fmt.Println(previewFrames)

	return "", nil

}

type PreviewFrame struct {
	FrameNo    int
	PreviewUrl string
}

func generatePreviewFrames(ctx context.Context, videoUrl string, fps int, frameCount int) ([]PreviewFrame, error) {
	previewFramesNos := getPreviewFrameNos(fps, frameCount)
	previewFrames := make([]PreviewFrame, len(previewFramesNos))

	tempDirPath, err := myctx.GetValue(ctx, model.TempDirPath)

	if err != nil {
		return nil, err
	}

	for i, frameNo := range previewFramesNos {

		outputPath := fmt.Sprintf("%s/%s.png", tempDirPath, uuid.NewString())

		extractor := &extractor.Extractor{
			VideoPath:  videoUrl,
			OutputPath: outputPath,
		}

		err := extractor.ExtractCompressedImage(ctx, frameNo, model.EXTREMELY_LOW_SD_240p)

		if err != nil {
			return nil, err
		}

		uploader := &uploader.Uploader{
			FilePath:   outputPath,
			FolderPath: "temp",
		}
		previewUrl, err := uploader.UploadFile(ctx)

		if err != nil {
			return nil, err
		}

		previewFrame := PreviewFrame{
			FrameNo:    frameNo,
			PreviewUrl: previewUrl,
		}
		previewFrames[i] = previewFrame
	}

	return previewFrames, nil
}

func getPreviewCount(fps int, frameCount int) int {

	videoDurationSeconds := float64(frameCount) / float64(fps)

	previewFramesCount := (videoDurationSeconds * float64(PREVIEW_FRAMES_PER_SECOND))
	previewFramesCountInt := int(math.Ceil(previewFramesCount))
	return previewFramesCountInt
}

func getPreviewFrameNos(fps int, frameCount int) []int {
	if frameCount == 0 {
		return []int{}
	}

	previewCount := getPreviewCount(fps, frameCount)
	if previewCount <= 1 {
		return []int{0}
	}

	step := float64(frameCount-1) / float64(previewCount-1)
	frameNos := make([]int, previewCount)

	for i := 0; i < previewCount; i++ {
		frameNos[i] = int(math.Floor(float64(i) * step))
	}

	return frameNos

}

func getFpsAndFrameCount(ctx context.Context, clipinfoFactory IClipInfoFactory, videoUrl string) (int, int, error) {
	clipInfo := clipinfoFactory.New(videoUrl)

	fps, err := clipInfo.GetFPS(ctx)

	if err != nil {
		return 0, 0, err
	}

	frameCount, err := clipInfo.GetFrameCount(ctx)

	if err != nil {
		return 0, 0, err
	}

	return fps, frameCount, nil

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
