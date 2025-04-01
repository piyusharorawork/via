package workflow

import (
	"context"

	"quickreel.com/core/model"
)

type PopulateContentUrlInput struct {
	Layers     []*model.Layer
	VideoPath  string
	Fps        int
	FrameCount int
	Callback   model.ProgressCallback
}

func PopulateContentUrl(ctx context.Context, input PopulateContentUrlInput) error {
	totalSegmentCount := getTotalSegmentCount(input.Layers)

	completedSegmentCount := 0

	for _, layer := range input.Layers {
		for _, segment := range layer.Segments {
			if segment.Content.Type == "empty" || segment.Content.Type == "dissolve" {
				continue
			}

			contentUrl, err := GenerateContentUrl(ctx, GenerateContentUrlInput{
				VideoPath:  input.VideoPath,
				Segment:    segment,
				Fps:        input.Fps,
				FrameCount: input.FrameCount,
			})

			if err != nil {
				return err
			}

			segment.Content.Url = contentUrl
			completedSegmentCount++
			progressPercentage := (completedSegmentCount * 100) / totalSegmentCount
			input.Callback(progressPercentage)
		}
	}

	return nil
}

func getTotalSegmentCount(layers []*model.Layer) int {
	totalSegmentCount := 0

	for _, layer := range layers {
		for _, segment := range layer.Segments {
			if segment.Content.Type == "empty" || segment.Content.Type == "dissolve" {
				continue
			}
			totalSegmentCount++
		}
	}
	return totalSegmentCount
}
