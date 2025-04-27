package templateservice

import (
	"context"

	servicemodels "quick-reel.com/service/service-models"
	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
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

	return nil, nil
}
