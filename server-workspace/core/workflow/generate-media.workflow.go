package workflow

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/extracter"
	"quickreel.com/core/model"
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

	input.Cb(5, "Processing ...")
	encodedVideoUrl, err := getLowResolutionEncodedVideoUrl(ctx, input.OriginalVideoUrl, folderName)

	if err != nil {
		return "", err
	}

	fps, frameCount, err := getVideoInfo(encodedVideoUrl)

	if err != nil {
		return "", err
	}

	input.Cb(10, "Finding Beautiful Moments ...")

	err = PopulateContentUrl(ctx, PopulateContentUrlInput{
		Layers:     input.Layers,
		VideoPath:  encodedVideoUrl,
		Fps:        fps,
		FrameCount: frameCount,
		Callback: func(progress int) {
			amount := util.InterpolateAmount(11, 40, progress)
			input.Cb(amount, "Finding Beautiful Moments ...")
		},
	})

	if err != nil {
		return "", err
	}

	err = util.SaveArrayToJSON(input.LayersJSONPath, input.Layers)

	if err != nil {
		return "", err
	}

	previewDirPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-preview", input.VideoName)

	err = GeneratePreview(ctx, GeneratePreviewInput{
		Layers:         input.Layers,
		PreviewDirPath: previewDirPath,
		Callback: func(progress int) {
			amount := util.InterpolateAmount(41, 60, progress)
			input.Cb(amount, "Generating Preview ...")
		},
		ShowErrors: true,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveDir(previewDirPath)

	// Must Save before exporting frames
	err = util.SaveArrayToJSON(input.LayersJSONPath, input.Layers)

	if err != nil {
		return "", err
	}

	framesDirPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-frames", input.VideoName)

	exportFramesInput := extracter.ExportFramesInput{
		FrameCount:    422,
		FramesDirPath: framesDirPath,
		PageUrl:       "http://localhost:3000/project",
		VideoWidth:    360,
		VideoHeight:   640,
		Cb: func(percentage int) {
			amount := util.InterpolateAmount(61, 95, percentage)
			input.Cb(amount, "Capturing Those Memories ...")
		},
	}

	err = extracter.ExportFrames(exportFramesInput)

	if err != nil {
		return "", err
	}

	defer util.RemoveDir(framesDirPath)

	outputPath := fmt.Sprintf("/Users/piyusharora/projects/via/assets/temp/%s-output.mp4", input.VideoName)

	input.Cb(97, "Creating Quick Reel ...")
	err = extracter.ConvertFramesToVideo(extracter.ConvertFramesToVideoInput{
		FramesDirPath: framesDirPath,
		OutputPath:    outputPath,
		Fps:           30,
	})

	if err != nil {
		return "", err
	}
	defer util.RemoveFile(outputPath)

	input.Cb(98, "Finishing ...")
	exportedVideoUrl, err := upload(ctx, outputPath, "temp")

	input.Cb(100, "Done ...")
	return exportedVideoUrl, err
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
