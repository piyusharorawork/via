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
	Transitions      []*model.Transition
	OutputFilePath   string
}

func GenerateMedia(ctx context.Context, input GenerateMediaInput) error {
	folderName := fmt.Sprintf("temp/workspace-%s", uuid.NewString())
	encodedVideoUrl, err := getEncodedVideoUrl(ctx, input.OriginalVideoUrl, folderName)

	if err != nil {
		return err
	}

	fps, frameCount, err := getVideoInfo(encodedVideoUrl)

	if err != nil {
		return err
	}

	err = populateTransitionMedia(ctx, input.Transitions, folderName, encodedVideoUrl, fps, frameCount)

	if err != nil {
		return err
	}

	err = util.SaveArrayToJSON(input.OutputFilePath, input.Transitions)

	if err != nil {
		return err
	}

	return nil
}

func getMediaUrl(ctx context.Context, encodedVideoUrl string, startFrame int, endFrame int, kind string, folderName string, fps int) (string, error) {
	if kind == "empty" {
		return "", nil
	}

	if kind == "image" {
		imagePath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.png", uuid.NewString())
		err := core.ExtractImage(core.ExtractImageInput{
			VideoPath:  encodedVideoUrl,
			Frame:      startFrame,
			OutputPath: imagePath,
		})

		if err != nil {
			return "", err
		}

		defer util.RemoveFile(imagePath)

		imageUrl, err := upload(ctx, imagePath, folderName)

		if err != nil {
			return "", err
		}

		return imageUrl, nil
	}

	videoPath :=
		fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.NewString())
	core.ExtractClip(core.ExtractClipInput{
		VideoPath:  encodedVideoUrl,
		StartFrame: startFrame,
		EndFrame:   endFrame,
		OutputPath: videoPath,
		Fps:        fps,
	})

	defer util.RemoveFile(videoPath)

	webmVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.webm", uuid.New())
	err := core.ConvertWebm(core.ConvertWebmInput{
		VideoPath:  videoPath,
		OutputPath: webmVideoPath,
	})

	if err != nil {
		return "", err
	}
	defer util.RemoveFile(webmVideoPath)

	videoUrl, err := upload(ctx, webmVideoPath, folderName)

	return videoUrl, err

}

func upload(ctx context.Context, filePath string, folderName string) (string, error) {
	spaceName := ctx.Value(model.SpaceName).(string)
	region := ctx.Value(model.Region).(string)
	accessKey := ctx.Value(model.AccessKey).(string)
	secretKey := ctx.Value(model.SecretKey).(string)

	input := core.UploadFileInput{
		FilePath:   filePath,
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderName,
	}

	data, err := core.UploadFile(input)

	if err != nil {
		return "", err
	}

	return data.Url, nil

}

func getMoment(content *model.LayoutContent, transitionStart int, transitionEnd int, fps int, frameCount int) (core.FindMomentOutput, error) {
	var kind core.MomentKind

	if content.Kind == "image" {
		kind = core.IMAGE
	} else if content.Kind == "video" {
		kind = core.VIDEO
	}

	input := core.FindMomentInput{
		Kind:           kind,
		Fps:            fps,
		RequiredFrames: transitionEnd - transitionStart,
		TotalFrames:    frameCount,
	}

	moment, err := core.FindMoment(input)
	if err != nil {
		return core.FindMomentOutput{}, err
	}

	return moment, nil

}

func getEncodedVideoUrl(ctx context.Context, originalVideoUrl string, folderName string) (string, error) {

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

	encodedVideoUrl, err := upload(ctx, encodedVideoPath, folderName)

	if err != nil {
		return "", err
	}

	return encodedVideoUrl, nil

}

func getVideoInfo(encodedVideoUrl string) (fps, frameCount int, err error) {
	fps, err = core.GetFPS(encodedVideoUrl)
	if err != nil {
		return 0, 0, err
	}

	frameCount, err = core.GetFrameCount(encodedVideoUrl)
	if err != nil {
		return 0, 0, err
	}

	return
}

func populateTransitionMedia(ctx context.Context, transitions []*model.Transition, folderName string, encodedVideoUrl string, fps int, frameCount int) error {

	for transitionIdx, transition := range transitions {
		for _, content := range transition.Info.Content {
			moment, err := getMoment(content, transition.StartFrame, transition.EndFrame, fps, frameCount)
			if err != nil {
				return err
			}

			mediaUrl, err := getMediaUrl(ctx, encodedVideoUrl, moment.StartFrame, moment.EndFrame, content.Kind, folderName, fps)
			if err != nil {
				return err
			}

			content.MediaUrl = mediaUrl

		}
		fmt.Printf("Transition %d / %d\n", transitionIdx+1, len(transitions))
	}
	return nil
}
