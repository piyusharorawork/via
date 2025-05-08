package adapter

import (
	"testing"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/extractor"
)

func TestExtractClip(t *testing.T) {
	tt := []struct {
		name         string
		startFrameNo int
		endFrameNo   int
		fps          int
	}{
		{
			name:         "success",
			startFrameNo: 10,
			endFrameNo:   20,
			fps:          5,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			extractor := &extractor.MockExtractor{}

			ExtractClip(ctx, extractor, 0, 0, 0)
			if !extractor.ExtractClipCalled {
				t.Errorf("ExtractClip not called")
			}

		})
	}
}
