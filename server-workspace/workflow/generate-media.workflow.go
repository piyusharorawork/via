package workflow

import (
	"context"
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
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

	encodedVideoUrl, err := getEncodedVideoUrl(input.OriginalVideoUrl)

	if err != nil {
		return err
	}

	println(encodedVideoUrl)
	return nil
}

func getEncodedVideoUrl(originalVideoUrl string) (string, error) {

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

	err = godotenv.Load()
	if err != nil {
		panic(err)
	}

	accessKey := os.Getenv("ACCESS_KEY")
	secretKey := os.Getenv("SECRET_KEY")
	region := os.Getenv("REGION")
	spaceName := os.Getenv("SPACE_NAME")
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
