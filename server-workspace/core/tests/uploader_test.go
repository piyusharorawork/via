package tests

import (
	"testing"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/uploader"
)

func TestUploaderFile(t *testing.T) {
	tt := []struct {
		name       string
		filePath   string
		folderPath string
		wantUrl    string
	}{
		{
			name:       "valid file with progress callback",
			filePath:   "./media/big-file.txt",
			folderPath: "temp",
			wantUrl:    "https://test-v1.blr1.digitaloceanspaces.com/temp/big-file.txt",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx, err := myctx.GetTestCtx()

			if err != nil {
				t.Fatalf("failed to get context: %v", err)
			}

			percentages := make([]int, 0)

			uploader := uploader.Uploader{
				FilePath:   tc.filePath,
				FolderPath: tc.folderPath,
				ProgressCallback: func(percentage int) {
					percentages = append(percentages, percentage)
				},
			}

			url, err := uploader.UploadFile(ctx)

			if err != nil {
				t.Fatalf("failed to upload file: %v", err)
			}

			if url != tc.wantUrl {
				t.Fatalf("expected %s, got %s", tc.wantUrl, url)
			}

			if len(percentages) == 0 {
				t.Fatalf("expected at least one progress percentage, got %d", len(percentages))
			}

			if percentages[len(percentages)-1] != 100 {
				t.Fatalf("expected last progress percentage to be 100, got %d", percentages[len(percentages)-1])
			}

		})
	}

}
