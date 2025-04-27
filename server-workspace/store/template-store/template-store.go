package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
)

type ITemplateStore interface {
	Clean(ctx context.Context) error
	Remove(ctx context.Context, id string) error
	List(ctx context.Context) ([]*storemodels.Template, error)
	Save(ctx context.Context, input SaveTemplateInput) (string, error)
}

type TemplateStore struct{}

func (store *TemplateStore) Clean(ctx context.Context) error {
	return cleanTemplates(ctx)
}

func (store *TemplateStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}

func (store *TemplateStore) Save(ctx context.Context, input SaveTemplateInput) (string, error) {
	return save(ctx, input)
}

func (store *TemplateStore) List(ctx context.Context) ([]*storemodels.Template, error) {
	return listTemplates(ctx)
}
