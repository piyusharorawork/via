package templateservice

import (
	"context"
	"errors"
	"time"

	"quickreel.com/core/util"
)

type ITemplateService interface {
	CreateTemplate(ctx context.Context, input CreateTemplateInput) (string, error)
}

type TemplateService struct {
	MediaCreator    IMediaCreator
	ClipInfoFactory IClipInfoFactory
}

func (service *TemplateService) CreateTemplate(ctx context.Context, input CreateTemplateInput) (string, error) {
	defer util.TimeTrack(time.Now(), "create template")

	if service.MediaCreator == nil {
		return "", errors.New("media creator is not set")
	}

	if service.ClipInfoFactory == nil {
		return "", errors.New("clip info factory is not set")
	}

	return createTemplate(ctx, service.MediaCreator, service.ClipInfoFactory, input)
}
