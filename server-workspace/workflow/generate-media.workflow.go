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
	Layers           []*model.Layer
	LayersJSONPath   string
}

// TODO might need to divide into smaller tasks
func GenerateMedia(ctx context.Context, input GenerateMediaInput) (string, error) {
	folderName := fmt.Sprintf("temp/workspace-%s", uuid.NewString())
	encodedVideoUrl, err := getEncodedVideoUrl(ctx, input.OriginalVideoUrl, folderName)

	if err != nil {
		return "", err
	}

	fps, frameCount, err := getVideoInfo(encodedVideoUrl)

	if err != nil {
		return "", err
	}

	err = populateTransitionMedia(ctx, input.Layers, folderName, encodedVideoUrl, fps, frameCount)

	if err != nil {
		return "", err
	}

	exportFramesInput := core.ExportFramesInput{
		FrameCount:    422,
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		PageUrl:       "http://localhost:3000/project",
		VideoWidth:    360,
		VideoHeight:   640,
	}

	err = core.ExportFrames(exportFramesInput)

	if err != nil {
		return "", err
	}

	defer util.RemoveDir("/Users/piyusharora/projects/via/assets/temp/rishikesh-frames")

	err = core.ConvertFramesToVideo(core.ConvertFramesToVideoInput{
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		OutputPath:    "/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4",
		Fps:           30,
	})

	if err != nil {
		return "", err
	}
	defer util.RemoveFile("/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4")

	err = generatePreview(ctx, input.Layers, exportFramesInput.FramesDirPath)

	if err != nil {
		return "", err
	}

	err = util.SaveArrayToJSON(input.LayersJSONPath, input.Layers)

	if err != nil {
		return "", err
	}

	exportedVideoUrl, err := upload(ctx, "/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4", "temp")

	return exportedVideoUrl, err
}

func generatePreview(ctx context.Context, layers []*model.Layer, framesDirPath string) error {
	segments := layers[0].Segments
	for segmentIdx, segment := range segments {
		imagePath := fmt.Sprintf("%s/%d.png", framesDirPath, segment.Start)
		outPath := fmt.Sprintf("%s/%d-low.png", framesDirPath, segment.Start)
		err := core.ResizeImage(core.ResizeImageInput{
			ImagePath:  imagePath,
			Resolution: core.BARE_MINIMUM_SD_96p,
			OutputPath: outPath,
		})

		if err != nil {
			return err
		}

		defer util.RemoveFile(outPath)

		previewUrl, err := upload(ctx, outPath, "temp")

		if err != nil {
			return err
		}

		segment.PreviewUrl = previewUrl

		fmt.Printf("Preview %d / %d\n", segmentIdx+1, len(segments))

	}

	return nil
}

func getMediaUrl(ctx context.Context, encodedVideoUrl string, start int, end int, kind string, folderName string, fps int) (string, error) {
	if kind == "empty" {
		return "", nil
	}

	if kind == "image" {
		imagePath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.png", uuid.NewString())
		err := core.ExtractImage(core.ExtractImageInput{
			VideoPath:  encodedVideoUrl,
			Frame:      start,
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
		Start:      start,
		End:        end,
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
	region := ctx.Value(model.SpaceRegion).(string)
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)

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

func getMoment(content *model.SegmentContent, transitionStart int, transitionEnd int, fps int, frameCount int) (core.FindMomentOutput, error) {
	var kind core.MomentKind

	if content.Type == "image" {
		kind = core.IMAGE
	} else if content.Type == "video" {
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

func populateTransitionMedia(ctx context.Context, layers []*model.Layer, folderName string, encodedVideoUrl string, fps int, frameCount int) error {

	for layerIdx, layer := range layers {
		segments := layer.Segments
		for segmentIdx, transition := range segments {
			content := transition.Content
			if content == nil {
				continue
			}

			moment, err := getMoment(content, transition.Start, transition.End, fps, frameCount)
			if err != nil {
				return err
			}

			mediaUrl, err := getMediaUrl(ctx, encodedVideoUrl, moment.Start, moment.End, content.Type, folderName, fps)
			if err != nil {
				return err
			}

			content.Url = mediaUrl
			fmt.Printf("Layer %d / %d : Segment %d / %d\n", layerIdx+1, len(layers), segmentIdx+1, len(segments))
		}
	}

	return nil
}
