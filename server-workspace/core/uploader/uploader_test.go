package uploader

import (
	"testing"

	myctx "quickreel.com/core/ctx"
)

func TestUploaderFile(t *testing.T) {
	tt := []struct {
		name       string
		filePath   string
		folderPath string
		wantUrl    string
	}{
		{
			name:       "valid file",
			filePath:   "./test-assets/sample.txt",
			folderPath: "test/test-assets",
			wantUrl:    "https://test-v1.blr1.digitaloceanspaces.com/test/test-assets/sample.txt",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get context: %v", err)
			}

			uploader := Uploader{
				FilePath:   tc.filePath,
				FolderPath: tc.folderPath,
			}

			url, err := uploader.UploadFile(ctx)

			if err != nil {
				t.Fatalf("failed to upload file: %v", err)
			}

			if url != tc.wantUrl {
				t.Fatalf("expected %s, got %s", tc.wantUrl, url)
			}

		})
	}

}
