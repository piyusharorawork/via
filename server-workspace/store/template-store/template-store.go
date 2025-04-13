package templatestore

import "context"

type ITemplateStore interface {
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SaveTemplateInput) (string, error)
}

type TemplateStore struct{}

func (store *TemplateStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}

func (store *TemplateStore) Save(ctx context.Context, input SaveTemplateInput) (string, error) {
	return save(ctx, input)
}
