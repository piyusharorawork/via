package workflow

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/extracter"
	"quickreel.com/core/imgmod"
	"quickreel.com/core/model"
	"quickreel.com/core/moment"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
	"quickreel.com/core/vidmod"
)

type Callback func(progress int, msg string)

// TODO

type GenerateMediaInput struct {
	OriginalVideoUrl string
	Layers           []*model.Layer
	LayersJSONPath   string
	VideoName        string
	Cb               Callback
}

// TODO might need to divide into smaller tasks
func GenerateMedia(ctx context.Context, input GenerateMediaInput) (string, error) {
	folderName := fmt.Sprintf("temp/workspace-%s", uuid.NewString())

	encodedVideoUrl, err := getLowResolutionEncodedVideoUrl(ctx, input.OriginalVideoUrl, folderName)

	if err != nil {
		return "", err
	}

	fps, frameCount, err := getVideoInfo(encodedVideoUrl)

	if err != nil {
		return "", err
	}

	input.Cb(10, "Finding Beautiful Moments ...")
	err = populateTransitionMedia(ctx, input.Layers, folderName, encodedVideoUrl, fps, frameCount, func(progressPercentage int) {
		amount := interpolateAmount(12, 50, progressPercentage)
		input.Cb(amount, "Finding Beautiful Moments ...")
	})

	if err != nil {
		return "", err
	}

	previewDirPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-preview", input.VideoName)

	err = generatePreview(ctx, input.Layers, previewDirPath)

	if err != nil {
		return "", err
	}

	defer util.RemoveDir(previewDirPath)

	err = util.SaveArrayToJSON(input.LayersJSONPath, input.Layers)

	if err != nil {
		return "", err
	}

	input.Cb(50, "Capturing Those Memories ...")
	framesDirPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-frames", input.VideoName)

	exportFramesInput := extracter.ExportFramesInput{
		FrameCount:    422,
		FramesDirPath: framesDirPath,
		PageUrl:       "http://localhost:3000/project",
		VideoWidth:    360,
		VideoHeight:   640,
		Cb: func(percentage int) {
			amount := interpolateAmount(50, 90, percentage)
			input.Cb(amount, "Capturing Those Memories ...")
		},
	}

	err = extracter.ExportFrames(exportFramesInput)

	input.Cb(90, "Creating Quick Reel ...")
	if err != nil {
		return "", err
	}

	defer util.RemoveDir(framesDirPath)

	outputPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-output.mp4", input.VideoName)

	err = extracter.ConvertFramesToVideo(extracter.ConvertFramesToVideoInput{
		FramesDirPath: framesDirPath,
		OutputPath:    outputPath,
		Fps:           30,
	})

	if err != nil {
		return "", err
	}
	defer util.RemoveFile(outputPath)

	// err = generatePreview(ctx, input.Layers, exportFramesInput.FramesDirPath)

	// if err != nil {
	// 	return "", err
	// }

	// err = util.SaveArrayToJSON(input.LayersJSONPath, input.Layers)

	// if err != nil {
	// 	return "", err
	// }

	input.Cb(98, "Finishing ...")
	exportedVideoUrl, err := upload(ctx, outputPath, "temp")

	return exportedVideoUrl, err
}

func generatePreview(ctx context.Context, layers []*model.Layer, previewDirPath string) error {
	segments := layers[0].Segments
	for segmentIdx, segment := range segments {
		imagePath := fmt.Sprintf("%s/%d.png", previewDirPath, segment.Start)
		outPath := fmt.Sprintf("%s/%d-low.png", previewDirPath, segment.Start)
		err := imgmod.ResizeImage(imgmod.ResizeImageInput{
			ImagePath:  imagePath,
			Resolution: model.BARE_MINIMUM_SD_90p,
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
		err := extracter.ExtractImage(extracter.ExtractImageInput{
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
	extracter.ExtractClip(extracter.ExtractClipInput{
		VideoPath:  encodedVideoUrl,
		Start:      start,
		End:        end,
		OutputPath: videoPath,
		Fps:        fps,
	})

	defer util.RemoveFile(videoPath)

	webmVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.webm", uuid.New())
	err := vidmod.ConvertWebm(vidmod.ConvertWebmInput{
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

	input := uploader.UploadFileInput{
		FilePath:   filePath,
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
		FolderPath: folderName,
	}

	data, err := uploader.UploadFile(input)

	if err != nil {
		return "", err
	}

	return data.Url, nil

}

func getMoment(content *model.SegmentContent, transitionStart int, transitionEnd int, fps int, frameCount int) (*moment.FindMomentOutput, error) {
	var kind moment.MomentKind

	if content.Type == "image" {
		kind = moment.IMAGE
	} else if content.Type == "video" {
		kind = moment.VIDEO
	}

	input := moment.FindMomentInput{
		Kind:           kind,
		Fps:            fps,
		RequiredFrames: transitionEnd - transitionStart,
		TotalFrames:    frameCount,
	}

	moment, err := moment.FindMoment(input)

	if err != nil {
		return nil, err
	}

	// if err != nil {
	// 	return moment.FindMomentOutput{}, err
	// }

	return moment, nil

}

func getLowResolutionEncodedVideoUrl(ctx context.Context, originalVideoUrl string, folderName string) (string, error) {

	// Resize video to 360p
	resizedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())

	err := vidmod.ResizeVideo(vidmod.ResizeVideoInput{
		VideoPath:  originalVideoUrl,
		Resolution: model.VERY_LOW_SD_360p,
		OutputPath: resizedVideoPath,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(resizedVideoPath)

	// Remove the audio
	mutedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())
	err = vidmod.MuteVideo(vidmod.MuteVideoInput{
		VideoPath:  resizedVideoPath,
		OutputPath: mutedVideoPath,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveFile(mutedVideoPath)
	// Encode the video
	encodedVideoPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s.mp4", uuid.New())
	err = vidmod.EncodeVideo(vidmod.EncodeVideoInput{
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
	fps, err = clipinfo.GetFPS(encodedVideoUrl)
	if err != nil {
		return 0, 0, err
	}

	frameCount, err = clipinfo.GetFrameCount(encodedVideoUrl)
	if err != nil {
		return 0, 0, err
	}

	return
}

func populateTransitionMedia(ctx context.Context, layers []*model.Layer, folderName string, encodedVideoUrl string, fps int, frameCount int, cb model.ProgressCallback) error {
	var totalSegmentCount int = 0

	for _, layer := range layers {
		totalSegmentCount += len(layer.Segments)
	}

	var completedSegmentCount int = 0

	for _, layer := range layers {
		segments := layer.Segments
		for _, transition := range segments {
			content := transition.Content
			if content == nil {
				completedSegmentCount++
				continue
			}

			if content.Type == "dissolve" || content.Type == "empty" {
				completedSegmentCount++
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
			completedSegmentCount++
			progressPercent := completedSegmentCount * 100 / totalSegmentCount
			cb(progressPercent)
		}
	}

	return nil
}

func interpolateAmount(low int, high int, progressPercentage int) int {
	return low + (high-low)*progressPercentage/100

}
