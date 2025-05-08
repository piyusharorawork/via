package workflow

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"quickreel.com/core/extracter"
	"quickreel.com/core/model"
	"quickreel.com/core/moment"
	"quickreel.com/core/util"
)

type ValidateTransitionInput struct {
	TemplateVideoUrl    string
	Layers              []*model.Layer
	TransitionsJSONPath string
}

func ValidateTransition(ctx context.Context, input ValidateTransitionInput) (string, error) {
	folderName := fmt.Sprintf("temp/workspace-%s", uuid.NewString())
	encodedVideoUrl, err := getLowResolutionEncodedVideoUrl(ctx, input.TemplateVideoUrl, folderName)

	if err != nil {
		return "", err
	}

	fps, _, err := getVideoInfo(encodedVideoUrl)

	if err != nil {
		return "", err
	}

	err = populateTemplateMedia(ctx, input.Layers, folderName, encodedVideoUrl, fps)

	if err != nil {
		return "", err
	}

	err = util.SaveArrayToJSON(input.TransitionsJSONPath, input.Layers)

	if err != nil {
		return "", err
	}

	err = extracter.ExportFrames(extracter.ExportFramesInput{
		FrameCount:    422,
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		PageUrl:       "http://localhost:3000/project",
		VideoWidth:    360,
		VideoHeight:   640,
	})

	if err != nil {
		return "", err
	}

	defer util.RemoveDir("/Users/piyusharora/projects/via/assets/temp/rishikesh-frames")

	err = extracter.ConvertFramesToVideo(extracter.ConvertFramesToVideoInput{
		FramesDirPath: "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames",
		OutputPath:    "/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4",
		Fps:           30,
	})

	if err != nil {
		return "", err
	}
	defer util.RemoveFile("/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4")

	exportedVideoUrl, err := upload(ctx, "/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4", "temp")

	return exportedVideoUrl, err

}

func populateTemplateMedia(ctx context.Context, layers []*model.Layer, folderName string, encodedVideoUrl string, fps int) error {
	for layerIdx, layer := range layers {
		segments := layer.Segments
		for segmentIdx, segment := range segments {
			if segment.Content == nil {
				continue
			}

			moment := moment.FindMomentOutput{
				Start: segment.Start,
				End:   segment.End,
			}

			mediaUrl, err := getMediaUrl(ctx, encodedVideoUrl, moment.Start, moment.End, segment.Content.Type, folderName, fps)
			if err != nil {
				return err
			}

			segment.Content.Url = mediaUrl
			fmt.Printf(" Layer %d / %d : Transition %d / %d\n", layerIdx+1, len(layers), segmentIdx+1, len(segments))
		}
	}

	return nil
}
