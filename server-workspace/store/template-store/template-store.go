package templatestore

import (
	"context"

	storemodels "quick-reel.com/store/store-models"
	"quick-reel.com/store/table"
)

type ITemplateStore interface {
	Clean(ctx context.Context) error
	Seed(ctx context.Context, templates []*storemodels.Template) error
	// List returns all templates in the store.
	Fetch(ctx context.Context) ([]*storemodels.Template, error)

	// Save creates  a template in the store.
	Save(ctx context.Context, input SaveTemplateInput) (string, error)

	// Get returns a template by its ID.
	Get(ctx context.Context, id string) (*storemodels.Template, error)

	// Remove deletes a template by its ID.
	Remove(ctx context.Context, id string) error
}

type TemplateStore struct{}

func (store *TemplateStore) Clean(ctx context.Context) error {
	table := getTable()
	return cleanTemplates(ctx, table)
}

func (store *TemplateStore) Seed(ctx context.Context, templates []*storemodels.Template) error {
	table := getTable()
	return seedTemplates(ctx, templates, table)
}

func (store *TemplateStore) Fetch(ctx context.Context) ([]*storemodels.Template, error) {
	table := getTable()
	return fetchTemplates(ctx, table)
}

func (store *TemplateStore) Save(ctx context.Context, input SaveTemplateInput) (string, error) {
	table := getTable()
	return saveTemplate(ctx, input, table)
}

func (store *TemplateStore) Get(ctx context.Context, id string) (*storemodels.Template, error) {
	table := getTable()
	return getTemplate(ctx, id, table)
}

func (store *TemplateStore) Remove(ctx context.Context, id string) error {
	table := getTable()
	return removeTemplate(ctx, id, table)
}

func getTable() *table.Table {
	const sql = `
	CREATE TABLE IF NOT EXISTS template (
		id TEXT NOT NULL PRIMARY KEY, 
		name TEXT NOT NULL, 
		website_url TEXT NOT NULL,
		video_url TEXT NOT NULL,
		audio_url TEXT NOT NULL,
		clipinfo_id TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY(clipinfo_id) REFERENCES clipinfo(id)
	);
		`
	table := &table.Table{
		SqlQuery: sql,
	}
	return table
}
