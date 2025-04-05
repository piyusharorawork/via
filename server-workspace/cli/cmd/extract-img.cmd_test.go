package cmd

import (
	"bytes"
	"testing"

	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
)

func TestSaveExtractedImage(t *testing.T) {
	tt := []struct {
		name string
	}{
		{
			name: "save extracted image",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			imgExtractor := &extractor.MockExtractor{}
			buffer := &bytes.Buffer{}
			saveExtractedImage(ctx, imgExtractor, 0, buffer)
			if buffer.String() != "Image saved" {
				t.Errorf("saveExtractedImage() = %v, want %v", buffer.String(), "Image saved")
			}
		})

	}
}
