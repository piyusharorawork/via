package cmd

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
	"quickreel.com/cli/src/adapter"
	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/model"
	"quickreel.com/core/src/uploader"
	"quickreel.com/core/src/util"
	"quickreel.com/core/src/vidmod"
)

func init() {
	RootCmd.AddCommand(convertToMp4Cmd)
	convertToMp4Cmd.Flags().StringP("video-path", "v", "", "Video url/path of webm file")
	convertToMp4Cmd.MarkFlagRequired("video-path")
}

var convertToMp4Cmd = &cobra.Command{
	Use:   "copy-mp4-url",
	Short: "Copy mp4 url",
	Run: func(cmd *cobra.Command, args []string) {
		videoPath, err := cmd.Flags().GetString("video-path")
		if err != nil {
			panic(err)
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		tempDirPath := ctx.Value(model.TempDirPath).(string)
		outFilePath := fmt.Sprintf("%s/%s.mp4", tempDirPath, uuid.NewString())

		modifier := &vidmod.VideoModifier{
			VideoPath:  videoPath,
			OutputPath: outFilePath,
		}

		uploader := &uploader.Uploader{
			FilePath:   outFilePath,
			FolderPath: fmt.Sprintf("temp/%s", uuid.NewString()),
		}

		adapter.PrintMp4Url(ctx, modifier, uploader, os.Stdout)

		util.RemoveFile(outFilePath)

	},
}
