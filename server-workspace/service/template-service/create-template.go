package templateservice

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"quickreel.com/core/downloader"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
)

type CreateTemplateInput struct {
	Name       string
	WebsiteUrl string
}

func createTemplate(ctx context.Context, input CreateTemplateInput) (string, error) {

	tempDirPath := ctx.Value(model.TempDirPath).(string)
	outputFileName := uuid.NewString()

	downloader := &downloader.Downloader{
		WebsiteUrl:     input.WebsiteUrl,
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

	print(videoUrl)
	// audioUrl, err := createAudioUrl(ctx, input.WebsiteUrl)

	// if err != nil {
	// 	return "", err
	// }

	// print(audioUrl)

	return "", nil
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

func createAudioUrl(ctx context.Context, websiteUrl string) (string, error) {
	return "", nil
}
