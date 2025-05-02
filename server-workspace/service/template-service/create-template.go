package templateservice

import (
	"context"
	"fmt"
	"math"

	"github.com/google/uuid"
	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/core/clipinfo"
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

type CreateTemplateDependencies struct {
	MediaCreator      IMediaCreator
	ClipinfoFactory   clipinfo.IClipInfoFactory
	ExtractorFactory  extractor.IExtractorFactory
	UploaderFactory   uploader.IUploaderFactory
	ClipInfoStore     clipinfostore.IClipInfoStore
	TemplateStore     templatestore.ITemplateStore
	PreviewFrameStore previewframestore.IPreviewFrameStore
}

func createTemplate(ctx context.Context, input CreateTemplateInput, dependencies CreateTemplateDependencies) (string, error) {

	videoUrl, audioUrl, err := createVideoAudioUrls(ctx, input.WebsiteUrl, dependencies.MediaCreator)

	if err != nil {
		return "", err
	}

	fps, frameCount, err := getFpsAndFrameCount(ctx, videoUrl, dependencies.ClipinfoFactory)

	if err != nil {
		return "", err
	}

	clipinfoId, err := saveClipInfo(ctx, fps, frameCount, dependencies.ClipInfoStore)

	if err != nil {
		return "", err
	}

	saveTemplateInput := templatestore.SaveTemplateInput{
		Name:       input.Name,
		WebsiteUrl: input.WebsiteUrl,
		VideoUrl:   videoUrl,
		AudioUrl:   audioUrl,
		ClipInfoId: clipinfoId,
	}

	templateId, err := dependencies.TemplateStore.Save(ctx, saveTemplateInput)

	if err != nil {
		return "", err
	}

	previewFrames, err := generatePreviewFrames(ctx, videoUrl, fps, frameCount, dependencies.ExtractorFactory, dependencies.UploaderFactory)

	if err != nil {
		return "", err
	}

	savePreviewFrames(ctx, templateId, previewFrames, dependencies.PreviewFrameStore)

	return templateId, nil

}

func savePreviewFrames(ctx context.Context, templateId string, previewFrames []PreviewFrame, previewFramesStore previewframestore.IPreviewFrameStore) error {
	for _, previewFrame := range previewFrames {
		input := previewframestore.SavePreviewFrameInput{
			FrameNo:    previewFrame.FrameNo,
			ImageUrl:   previewFrame.PreviewUrl,
			TemplateId: templateId,
		}
		_, err := previewFramesStore.Save(ctx, input)
		if err != nil {
			return err
		}
	}

	return nil
}

func saveClipInfo(ctx context.Context, fps int, frameCount int, clipinfoStore clipinfostore.IClipInfoStore) (string, error) {

	input := clipinfostore.SaveClipInfoInput{
		Fps:        fps,
		FrameCount: frameCount,
	}

	id, err := clipinfoStore.Save(ctx, input)

	if err != nil {
		return "", err
	}

	return id, nil
}

type PreviewFrame struct {
	FrameNo    int
	PreviewUrl string
}

func generatePreviewFrames(ctx context.Context, videoUrl string, fps int, frameCount int, extractorFactory extractor.IExtractorFactory, uploaderFactory uploader.IUploaderFactory) ([]PreviewFrame, error) {
	previewFramesNos := getPreviewFrameNos(fps, frameCount)
	previewFrames := make([]PreviewFrame, len(previewFramesNos))

	tempDirPath, err := myctx.GetValue(ctx, model.TempDirPath)

	if err != nil {
		return nil, err
	}

	for i, frameNo := range previewFramesNos {
		outputPath := fmt.Sprintf("%s/%s.png", tempDirPath, uuid.NewString())
		extractor := extractorFactory.New(videoUrl, outputPath, fps)

		err := extractor.ExtractCompressedImage(ctx, frameNo, model.EXTREMELY_LOW_SD_240p)

		if err != nil {
			return nil, err
		}

		uploader := uploaderFactory.New(outputPath, "temp")
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

func getFpsAndFrameCount(ctx context.Context, videoUrl string, clipinfoFactory clipinfo.IClipInfoFactory) (int, int, error) {
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

func createVideoAudioUrls(ctx context.Context, websiteUrl string, mediaCreator IMediaCreator) (string, string, error) {
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
