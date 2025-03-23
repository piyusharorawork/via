package workflow

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"quickreel.com/core/extracter"
	"quickreel.com/core/model"
	"quickreel.com/core/moment"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
	"quickreel.com/core/vidmod"
)

type GenerateContentUrlInput struct {
	VideoPath  string
	Segment    *model.Segment
	Fps        int
	FrameCount int
}

func GenerateContentUrl(ctx context.Context, input GenerateContentUrlInput) (string, error) {
	moment, err := getRandomMoment(input.Segment, input.Fps, input.FrameCount)

	if err != nil {
		return "", err
	}

	filePath, err := getContentFilePath(input.VideoPath, moment, input.Segment.Content.Type, input.Fps)

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(filePath)

	momentUrl, err := uploadRandomClip(ctx, filePath)

	if err != nil {
		return "", err
	}

	return momentUrl, nil

}

func getRandomMoment(segment *model.Segment, fps int, frameCount int) (*moment.FindMomentOutput, error) {
	kind, err := getMomentKind(segment)

	if err != nil {
		return nil, err
	}

	input := moment.FindMomentInput{
		Kind:           kind,
		Fps:            fps,
		RequiredFrames: segment.End - segment.Start + 1,
		TotalFrames:    frameCount,
	}

	moment, err := moment.FindMoment(input)

	if err != nil {
		return nil, err
	}

	return moment, nil

}

func getMomentKind(segment *model.Segment) (moment.MomentKind, error) {
	if segment.Content.Type == "image" {
		return moment.IMAGE, nil
	}

	if segment.Content.Type == "video" {
		return moment.VIDEO, nil
	}

	return "", errors.New("segment content type not supported")
}

func uploadRandomClip(ctx context.Context, filePath string) (string, error) {
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	input := uploader.UploadFileInput{
		FilePath:   filePath,
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderPath,
	}

	data, err := uploader.UploadFile(input)

	if err != nil {
		panic(err)
	}

	return data.Url, nil
}

func getContentFilePath(videoPath string, moment *moment.FindMomentOutput, contentType string, fps int) (string, error) {
	if contentType == "image" {
		filePath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.png", uuid.NewString())
		err := extracter.ExtractImage(extracter.ExtractImageInput{
			VideoPath:  videoPath,
			Frame:      moment.Start,
			OutputPath: filePath,
		})

		if err != nil {
			return "", err
		}

		return filePath, nil

	}

	filePath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.NewString())

	err := extracter.ExtractClip(extracter.ExtractClipInput{
		VideoPath:  videoPath,
		Start:      moment.Start,
		End:        moment.End,
		OutputPath: filePath,
		Fps:        fps,
	})

	if err != nil {
		return "", err
	}

	webmPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.webm", uuid.NewString())

	err = vidmod.ConvertWebm(vidmod.ConvertWebmInput{
		VideoPath:  filePath,
		OutputPath: webmPath,
	})
	if err != nil {
		return "", err
	}

	return webmPath, nil

}
