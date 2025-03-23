package workflow

import (
	"context"
	"fmt"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/extracter"
	"quickreel.com/core/imgmod"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

type GeneratePreviewInput struct {
	Layers         []*model.Layer
	PreviewDirPath string
	Callback       model.ProgressCallback
	ShowErrors     bool
}

func GeneratePreview(ctx context.Context, input GeneratePreviewInput) error {
	totalPreviewCount := getTotalPreviewCount(input.Layers)
	comlpetedPreviewCount := 0
	util.EnsureDir(input.PreviewDirPath)
	defer util.RemoveDir(input.PreviewDirPath)

	for _, layer := range input.Layers {
		for _, segment := range layer.Segments {
			segmentTypes := getSegmentTypesToIgnore()
			if util.StringSliceContains(segmentTypes, segment.Content.Type) {
				continue
			}

			if segment.Content.Type == "image" {
				lowImgPath, err := getImagePreviewPath(input.PreviewDirPath, segment)
				if err != nil {
					return err
				}

				segment.PreviewUrls = append(segment.PreviewUrls, lowImgPath)
				continue
			}

			expectedPreviewCount := segment.End - segment.Start + 1
			actualPreviewCount, err := clipinfo.GetFrameCount(segment.Content.Url)

			if err != nil {
				return err
			}

			if expectedPreviewCount != actualPreviewCount {
				// TODO need to fix
				if input.ShowErrors {
					fmt.Printf("expectedPreviewCount: %d, actualPreviewCount: %d\n", expectedPreviewCount, actualPreviewCount)
					fmt.Print(segment.Content.Url)
				}

			}

			for frame := 1; frame <= actualPreviewCount; frame++ {
				previewPath, err := getVideoPreviewPath(input.PreviewDirPath, frame, segment)

				if err != nil {
					// TODO need to fix
					comlpetedPreviewCount++
					progressPercentage := (comlpetedPreviewCount * 100) / totalPreviewCount
					input.Callback(progressPercentage)
					if input.ShowErrors {
						fmt.Printf("couldnot get preview path for frame = %v", frame)
					}

					continue
				}

				previewUrl, err := uploadPreview(ctx, previewPath)

				if err != nil {
					// TODO need to fix
					comlpetedPreviewCount++
					progressPercentage := (comlpetedPreviewCount * 100) / totalPreviewCount
					input.Callback(progressPercentage)
					if input.ShowErrors {
						fmt.Printf("couldnot get preview url for frame = %v", frame)
					}

					continue
				}

				segment.PreviewUrls = append(segment.PreviewUrls, previewUrl)
				comlpetedPreviewCount++
				progressPercentage := (comlpetedPreviewCount * 100) / totalPreviewCount
				input.Callback(progressPercentage)
			}

		}

	}

	return nil

}

func getSegmentTypesToIgnore() []string {
	return []string{"empty", "dissolve"}
}

func getTotalPreviewCount(layers []*model.Layer) int {
	totalPreviewCount := 0

	for _, layer := range layers {
		for _, segment := range layer.Segments {
			segmentTypes := getSegmentTypesToIgnore()
			if util.StringSliceContains(segmentTypes, segment.Content.Type) {
				continue
			}

			if segment.Content.Type == "image" {
				totalPreviewCount++
				continue
			}

			previewCount := segment.End - segment.Start + 1
			totalPreviewCount += previewCount
		}
	}
	return totalPreviewCount
}

// TODO use extra resolution image
func getVideoPreviewPath(previewDirPath string, frame int, segment *model.Segment) (string, error) {
	imagePath := fmt.Sprintf("%s/%d.png", previewDirPath, frame)
	err := extracter.ExtractImage(extracter.ExtractImageInput{
		VideoPath:  segment.Content.Url,
		Frame:      frame,
		OutputPath: imagePath,
	})

	if err != nil {
		return "", err
	}

	lowImgPath := fmt.Sprintf("%s/%d-low.png", previewDirPath, frame)
	err = imgmod.ResizeImage(imgmod.ResizeImageInput{
		ImagePath:  imagePath,
		Resolution: model.BARE_MINIMUM_SD_90p,
		OutputPath: lowImgPath,
	})

	if err != nil {
		return "", err
	}

	return lowImgPath, nil
}

func getImagePreviewPath(previewDirPath string, segment *model.Segment) (string, error) {
	frame := 1
	imagePath := segment.Content.Url
	lowImgPath := fmt.Sprintf("%s/%d-low.png", previewDirPath, frame)
	err := imgmod.ResizeImage(imgmod.ResizeImageInput{
		ImagePath:  imagePath,
		Resolution: model.BARE_MINIMUM_SD_90p,
		OutputPath: lowImgPath,
	})

	if err != nil {
		return "", err
	}

	return lowImgPath, nil

}

func uploadPreview(ctx context.Context, previewPath string) (string, error) {
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	input := uploader.UploadFileInput{
		FilePath:   previewPath,
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
