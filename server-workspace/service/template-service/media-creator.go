package templateservice

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/downloader"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
)

type IMediaCreator interface {
	CreateVideoUrl(ctx context.Context, websiteUrl string) (string, error)
	CreateAudioUrl(ctx context.Context, websiteUrl string) (string, error)
}

type MediaCreator struct {
}

func (creator *MediaCreator) CreateVideoUrl(ctx context.Context, websiteUrl string) (string, error) {
	tempDirPath, err := myctx.GetValue(ctx, model.TempDirPath)

	if err != nil {
		return "", err
	}

	outputFileName := fmt.Sprintf("%s.mp4", uuid.NewString())

	downloader := &downloader.Downloader{
		WebsiteUrl:     websiteUrl,
		OutputDirPath:  tempDirPath,
		OutputFileName: outputFileName,
	}

	filePath := fmt.Sprintf("%s/%s", tempDirPath, outputFileName)
	uploader := &uploader.Uploader{
		FilePath:   filePath,
		FolderPath: "temp",
	}

	videoUrl, err := createVideoUrl(ctx, downloader, uploader)

	if err != nil {
		return "", err
	}

	return videoUrl, nil
}

func (creator *MediaCreator) CreateAudioUrl(ctx context.Context, websiteUrl string) (string, error) {
	tempDirPath, err := myctx.GetValue(ctx, model.TempDirPath)

	if err != nil {
		return "", err
	}

	outputFileName := fmt.Sprintf("%s.mp3", uuid.NewString())

	downloader := &downloader.Downloader{
		WebsiteUrl:     websiteUrl,
		OutputDirPath:  tempDirPath,
		OutputFileName: outputFileName,
	}

	filePath := fmt.Sprintf("%s/%s", tempDirPath, outputFileName)
	uploader := &uploader.Uploader{
		FilePath:   filePath,
		FolderPath: "temp",
	}

	audioUrl, err := createAudioUrl(ctx, downloader, uploader)

	if err != nil {
		return "", err
	}

	return audioUrl, nil
}

func createVideoUrl(ctx context.Context, downloader downloader.IDownloader, uploader uploader.IUploader) (string, error) {
	err := downloader.DownloadVideo(ctx)

	if err != nil {
		return "", err
	}

	url, err := uploader.UploadFile(ctx)

	if err != nil {
		return "", err
	}

	return url, nil
}

func createAudioUrl(ctx context.Context, downloader downloader.IDownloader, uploader uploader.IUploader) (string, error) {
	err := downloader.DownloadAudio(ctx)

	if err != nil {
		return "", err
	}

	url, err := uploader.UploadFile(ctx)

	if err != nil {
		return "", err
	}

	return url, nil
}
