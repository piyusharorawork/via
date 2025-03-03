package workflow

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"quick-reel.com/core"
	model "quick-reel.com/models"
	"quick-reel.com/util"
)

type ValidateTransitionInput struct {
	TemplateVideoUrl    string
	Layers              []*model.Layer
	TransitionsJSONPath string
}

func ValidateTransition(ctx context.Context, input ValidateTransitionInput) (string, error) {
	folderName := fmt.Sprintf("temp/workspace-%s", uuid.NewString())
	encodedVideoUrl, err := getEncodedVideoUrl(ctx, input.TemplateVideoUrl, folderName)

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

	err = core.ExportFrames(core.ExportFramesInput{
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

	err = core.ConvertFramesToVideo(core.ConvertFramesToVideoInput{
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
		transitions := layer.Transitions
		for transitionIdx, transition := range transitions {
			if transition.Info == nil {
				continue
			}

			moment := core.FindMomentOutput{
				StartFrame: transition.StartFrame,
				EndFrame:   transition.EndFrame,
			}

			mediaUrl, err := getMediaUrl(ctx, encodedVideoUrl, moment.StartFrame, moment.EndFrame, transition.Info.Content.Kind, folderName, fps)
			if err != nil {
				return err
			}

			transition.Info.Content.MediaUrl = mediaUrl
			fmt.Printf(" Layer %d : Transition %d / %d\n", layerIdx+1, transitionIdx+1, len(transitions))
		}
	}

	return nil
}
