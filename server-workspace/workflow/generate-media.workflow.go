package workflow

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"quick-reel.com/core"
	model "quick-reel.com/models"
	"quick-reel.com/util"
)

type GenerateMediaInput struct {
	OriginalVideoUrl string
	Transitions      []model.Transition
	OutputFilePath   string
}

func GenerateMedia(ctx context.Context, input GenerateMediaInput) error {

	encodedVideoUrl, err := getEncodedVideoUrl(ctx, input.OriginalVideoUrl)

	if err != nil {
		return err
	}

	println(encodedVideoUrl)
	return nil
}

func getEncodedVideoUrl(ctx context.Context, originalVideoUrl string) (string, error) {

	// Resize video to 360p
	resizedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())

	err := core.ResizeVideo(core.ResizeVideoInput{
		VideoPath:  originalVideoUrl,
		Resolution: core.VERY_LOW_SD_360p,
		OutputPath: resizedVideoPath,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(resizedVideoPath)

	// Remove the audio
	mutedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())
	err = core.MuteVideo(core.MuteVideoInput{
		VideoPath:  resizedVideoPath,
		OutputPath: mutedVideoPath,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(mutedVideoPath)
	// Encode the video
	encodedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())
	err = core.EncodeVideo(core.EncodeVideoInput{
		VideoPath:  mutedVideoPath,
		OutputPath: encodedVideoPath,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(encodedVideoPath)

	accessKey := ctx.Value(model.AccessKey).(string)
	secretKey := ctx.Value(model.SecretKey).(string)
	region := ctx.Value(model.Region).(string)
	spaceName := ctx.Value(model.SpaceName).(string)

	folderName := fmt.Sprintf("temp/%s", uuid.NewString())

	uploadFileInput := core.UploadFileInput{
		VideoPath:  encodedVideoPath,
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderName,
	}

	data, err := core.UploadFile(uploadFileInput)

	if err != nil {
		return "", err
	}

	return data.Url, nil

}
