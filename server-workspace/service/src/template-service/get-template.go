package templateservice

import (
	"context"

	servicemodels "quick-reel.com/service/src/service-models"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
)

type GetTemplateDependencies struct {
	TemplateStore     templatestore.ITemplateStore
	ClipInfoStore     clipinfostore.IClipInfoStore
	PreviewFrameStore previewframestore.IPreviewFrameStore
}

func getTemplate(ctx context.Context, id string, dependencies GetTemplateDependencies) (*servicemodels.TemplateFull, error) {

	template, err := dependencies.TemplateStore.Get(ctx, id)

	if err != nil {
		return nil, err
	}

	clipInfo, err := dependencies.ClipInfoStore.Get(ctx, template.ClipInfoId)

	if err != nil {
		return nil, err
	}

	previewFrames, err := dependencies.PreviewFrameStore.Fetch(ctx, template.Id)

	if err != nil {
		return nil, err
	}

	mappedPreviewFrames := make([]*servicemodels.PreviewFrame, 0)
	for _, previewFrame := range previewFrames {
		previewFrame := &servicemodels.PreviewFrame{
			FrameNo:    previewFrame.FrameNo,
			PreviewUrl: previewFrame.ImageUrl,
		}
		mappedPreviewFrames = append(mappedPreviewFrames, previewFrame)
	}

	result := servicemodels.TemplateFull{
		Id:         template.Id,
		Name:       template.Name,
		WebsiteUrl: template.WebsiteUrl,
		VideoUrl:   template.VideoUrl,
		AudioUrl:   template.AudioUrl,
		ClipInfo: &servicemodels.ClipInfoFull{
			Fps:         clipInfo.Fps,
			FrameCount:  clipInfo.FrameCount,
			FrameWidth:  clipInfo.FrameWidth,
			FrameHeight: clipInfo.FrameHeight,
		},
		PreviewFrames: mappedPreviewFrames,
	}

	return &result, nil

}
