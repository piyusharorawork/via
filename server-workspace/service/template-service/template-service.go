package templateservice

import (
	"context"
	"errors"
	"time"

	"quickreel.com/core/clipinfo"
	"quickreel.com/core/extractor"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
)

type ITemplateService interface {
	CreateTemplate(ctx context.Context, input CreateTemplateInput) (string, error)
}

type TemplateService struct {
	MediaCreator     IMediaCreator
	ClipInfoFactory  clipinfo.IClipInfoFactory
	ExtractorFactory extractor.IExtractorFactory
	UploaderFactory  uploader.IUploaderFactory
}

func (service *TemplateService) CreateTemplate(ctx context.Context, input CreateTemplateInput) (string, error) {
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

	dependencies := CreateTemplateDependencies{
		MediaCreator:     service.MediaCreator,
		ClipinfoFactory:  service.ClipInfoFactory,
		ExtractorFactory: service.ExtractorFactory,
		UploaderFactory:  service.UploaderFactory,
	}

	return createTemplate(ctx, input, dependencies)
}
