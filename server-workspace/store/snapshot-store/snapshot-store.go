package snapshotstore

import "context"

type ISnapshotStore interface {
	Remove(ctx context.Context, id string) error
	Save(ctx context.Context, input SaveSnapShotInput) (string, error)
}

// Using Sqlite
type SnapshotStore struct{}

func (store *SnapshotStore) Save(ctx context.Context, input SaveSnapShotInput) (string, error) {
	return save(ctx, input)
}

func (store *SnapshotStore) Remove(ctx context.Context, id string) error {
	return remove(ctx, id)
}
