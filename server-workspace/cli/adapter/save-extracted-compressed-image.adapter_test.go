package adapter

import (
	"bytes"
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/extractor"
)

func TestSaveCompressedExtractedImage(t *testing.T) {
	tt := []struct {
		name string
	}{
		{
			name: "success",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			imgExtractor := &extractor.MockExtractor{}
			buffer := &bytes.Buffer{}
			SaveCompressedExtractedImage(ctx, imgExtractor, 0, "ULTRA_HD_2160p", buffer)
			if buffer.String() != "Image saved" {
				t.Errorf("saveExtractedImage() = %v, want %v", buffer.String(), "Image saved")
			}
			if !imgExtractor.ExtractCompressedImageCalled {
				t.Errorf("ExtractCompressedImage not called")
			}
		})

	}
}
