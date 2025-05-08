package cmd

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
	"quickreel.com/cli/src/adapter"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/uploader"
)

func init() {
	RootCmd.AddCommand(uploadFileCmd)
	uploadFileCmd.Flags().StringP("file-path", "f", "", "Path of the file to upload")
	uploadFileCmd.MarkFlagRequired("file-path")

}

var uploadFileCmd = &cobra.Command{
	Use:   "upload-file",
	Short: "Upload File",
	Run: func(cmd *cobra.Command, args []string) {
		filePath, err := cmd.Flags().GetString("file-path")
		if err != nil {
			panic(err)
		}

		uploader := &uploader.Uploader{
			FilePath:   filePath,
			FolderPath: fmt.Sprintf("temp/%s", uuid.NewString()),
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		adapter.PrintUploadedUrl(ctx, uploader, os.Stdout)

	},
}
