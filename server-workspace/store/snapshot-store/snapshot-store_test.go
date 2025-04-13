package snapshotstore

import (
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestSaveSnapShot(t *testing.T) {
	tt := []struct {
		name     string
		frameNo  int
		imageUrl string
		wantErr  error
	}{}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get test ctx")
			}

			snapshotStore := SnapshotStore{}
			input := SaveSnapShotInput{
				FrameNo:  tc.frameNo,
				ImageUrl: tc.imageUrl,
			}

			id, err := snapshotStore.Save(ctx, input)

			if !util.AreErrorsSame(err, tc.wantErr) {
				t.Fatalf("SaveSnapShot() error = %v, wantErr %v", err, tc.wantErr)
			}

			if err == nil && id == "" {
				t.Fatalf("id is empty")
			}

			snapshotStore.Remove(ctx, id)

		})

	}
}
