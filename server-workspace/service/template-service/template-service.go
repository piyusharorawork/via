package templateservice

import (
	"context"
	"errors"
	"time"

	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/core/clipinfo"
	"quickreel.com/core/extractor"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

type ITemplateService interface {
	ListAll(ctx context.Context) ([]TemplateLite, error)
	Create(ctx context.Context, input CreateTemplateInput) (string, error)
}

type TemplateService struct {
	ShowProcessingTime bool
	MediaCreator       IMediaCreator
	ClipInfoFactory    clipinfo.IClipInfoFactory
	ExtractorFactory   extractor.IExtractorFactory
	UploaderFactory    uploader.IUploaderFactory
	ClipInfoStore      clipinfostore.IClipInfoStore
	TemplateStore      templatestore.ITemplateStore
	PreviewFrameStore  previewframestore.IPreviewFrameStore
}

func (service *TemplateService) Create(ctx context.Context, input CreateTemplateInput) (string, error) {
	defer util.TimeTrack(time.Now(), "create template")

	if service.MediaCreator == nil {
		return "", errors.New("media creator is not set")
	}

	if service.ClipInfoFactory == nil {
		return "", errors.New("clip info factory is not set")
	}

	if service.ExtractorFactory == nil {
		return "", errors.New("extractor factory is not set")
	}

	if service.UploaderFactory == nil {
		return "", errors.New("uploader factory is not set")
	}

	if service.ClipInfoStore == nil {
		return "", errors.New("clip info store is not set")
	}

	if service.TemplateStore == nil {
		return "", errors.New("template store is not set")
	}

	if service.PreviewFrameStore == nil {
		return "", errors.New("preview frame store is not set")
	}

	dependencies := CreateTemplateDependencies{
		MediaCreator:      service.MediaCreator,
		ClipinfoFactory:   service.ClipInfoFactory,
		ExtractorFactory:  service.ExtractorFactory,
		UploaderFactory:   service.UploaderFactory,
		ClipInfoStore:     service.ClipInfoStore,
		TemplateStore:     service.TemplateStore,
		PreviewFrameStore: service.PreviewFrameStore,
	}

	return createTemplate(ctx, input, dependencies)
}

func (service *TemplateService) ListAll(ctx context.Context) ([]TemplateLite, error) {
	if service.ShowProcessingTime {
		defer util.TimeTrack(time.Now(), "fetch all templates")
	}

	if service.TemplateStore == nil {
		return nil, errors.New("template store is not set")
	}

	dependencies := FetchAllTemplatesDependencies{
		TemplateStore: service.TemplateStore,
	}

	return fetchAllTemplates(ctx, dependencies)
}
