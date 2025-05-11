package templateservice

import (
	"context"
	"fmt"
	"math"

	"github.com/google/uuid"
	servicecommon "quick-reel.com/service/src/service-common"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
	"quickreel.com/core/src/clipinfo"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/extractor"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/uploader"
	"quickreel.com/core/src/util"
)

const (
	PREVIEW_FRAMES_PER_SECOND = 16
)

type CreateTemplateInput struct {
	Name       string
	WebsiteUrl string
	OnProgress func(progress int, message string)
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

	servicecommon.ReportProgress(input.OnProgress, 5, "Extracting video and audio from website ...")

	videoUrl, audioUrl, err := createVideoAudioUrls(ctx, input.WebsiteUrl, dependencies.MediaCreator, func(percentage int) {
		reportedPercentage := util.InterpolateAmount(5, 50, percentage)
		servicecommon.ReportProgress(input.OnProgress, reportedPercentage, "Extracting video and audio from website ...")
	})

	if err != nil {
		return "", err
	}

	servicecommon.ReportProgress(input.OnProgress, 51, "Extracting Fps and Frame count...")

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

	servicecommon.ReportProgress(input.OnProgress, 55, "Extracting Preview Frames")

	previewFrames, err := generatePreviewFrames(ctx, videoUrl, fps, frameCount, PREVIEW_FRAMES_PER_SECOND, func(percentage int) {
		reportedPercentage := util.InterpolateAmount(55, 90, percentage)
		servicecommon.ReportProgress(input.OnProgress, reportedPercentage, "Extracting Preview Frames")
	}, dependencies.ExtractorFactory, dependencies.UploaderFactory)

	if err != nil {
		return "", err
	}

	servicecommon.ReportProgress(input.OnProgress, 91, "Saving Template")

	err = savePreviewFrames(ctx, templateId, previewFrames, dependencies.PreviewFrameStore)

	if err != nil {
		return "", err
	}

	servicecommon.ReportProgress(input.OnProgress, 100, "Template saved")

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

func generatePreviewFrames(ctx context.Context, videoUrl string, fps int, frameCount int, previewFramesPerSecond int, progressCallback func(percentage int), extractorFactory extractor.IExtractorFactory, uploaderFactory uploader.IUploaderFactory) ([]PreviewFrame, error) {
	previewFramesNos := getPreviewFrameNos(fps, frameCount, previewFramesPerSecond)
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
		percentage := int(math.Floor(float64(i+1) * 100 / float64(len(previewFrames))))
		progressCallback(percentage)
	}

	progressCallback(100)

	return previewFrames, nil
}

func getPreviewCount(fps int, frameCount int, previewFramesPerSecond int) int {

	videoDurationSeconds := float64(frameCount) / float64(fps)
	previewFramesCount := (videoDurationSeconds * float64(previewFramesPerSecond))
	previewFramesCountInt := int(math.Ceil(previewFramesCount))
	return previewFramesCountInt
}

func getPreviewFrameNos(fps int, frameCount int, previewFramesPerSecond int) []int {
	if frameCount == 0 {
		return []int{}
	}

	previewCount := getPreviewCount(fps, frameCount, previewFramesPerSecond)
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

func createVideoAudioUrls(ctx context.Context, websiteUrl string, mediaCreator IMediaCreator, progressCallback func(percentage int)) (string, string, error) {
	videoChannel := make(chan struct {
		url string
		err error
	})

	audioChannel := make(chan struct {
		url string
		err error
	})

	go func() {
		url, err := mediaCreator.CreateVideoUrl(ctx, websiteUrl, progressCallback)
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
