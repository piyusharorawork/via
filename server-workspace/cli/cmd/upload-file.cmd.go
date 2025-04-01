package cmd

import (
	"context"
	"fmt"
	"io"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
	"quickreel.com/cli/util"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/uploader"
)

type UploadFileOutput struct {
	Url string `json:"url"`
}

func init() {
	rootCmd.AddCommand(uploadFileCmd)
	uploadFileCmd.Flags().StringP("file-path", "f", "", "Path of the file to upload")

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

		printUploadedUrl(ctx, uploader, os.Stdout)

	},
}

func printUploadedUrl(ctx context.Context, uploader uploader.IUploader, writer io.Writer) {
	url, err := uploader.UploadFile(ctx)

	if err != nil {
		panic(err)
	}

	output := &UploadFileOutput{
		Url: url,
	}

	json, err := util.ToJSON(output)

	if err != nil {
		panic(err)
	}

	fmt.Fprintln(writer, json)
}
