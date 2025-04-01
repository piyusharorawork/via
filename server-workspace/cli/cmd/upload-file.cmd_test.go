package cmd

import (
	"bytes"
	"testing"

	"quickreel.com/cli/util"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/uploader"
)

func TestPrintUploadedUrl(t *testing.T) {
	tt := []struct {
		name   string
		stdout string
	}{
		{
			name:   "test print uploaded url",
			stdout: "{\"url\":\"https://test-v1.blr1.digitaloceanspaces.com/test/test-assets/dummy.txt\"}",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			buffer := &bytes.Buffer{}
			ctx := myctx.GetEmptyCtx()
			uploader := uploader.MockUploader{
				Url: "https://test-v1.blr1.digitaloceanspaces.com/test/test-assets/dummy.txt",
			}

			printUploadedUrl(ctx, &uploader, buffer)

			if !util.CompareJSON(buffer.String(), tc.stdout) {
				t.Errorf("printClipInfo() = %v, want %v", buffer.String(), tc.stdout)
			}

		})
	}
}
