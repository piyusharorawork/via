package templateservice

import (
	"context"

	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
)

type RemoveTemplateDependencies struct {
	TemplateStore     templatestore.ITemplateStore
	PreviewFrameStore previewframestore.IPreviewFrameStore
	ClipInfoStore     clipinfostore.IClipInfoStore
}

func removeTemplate(ctx context.Context, id string, dependencies RemoveTemplateDependencies) error {
	// Remove all preview frames associated with the template
	err := dependencies.PreviewFrameStore.RemoveMany(ctx, id)
	if err != nil {
		return err
	}

	// remove clip info associated with the template
	err = dependencies.ClipInfoStore.Remove(ctx, id)

	if err != nil {
		return err
	}

	// remove template from the store
	err = dependencies.TemplateStore.Remove(ctx, id)
	if err != nil {
		return err
	}

	return nil

}
