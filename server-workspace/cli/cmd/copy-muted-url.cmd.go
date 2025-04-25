package cmd

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
	"quickreel.com/core/vidmod"
)

func init() {
	RootCmd.AddCommand(copyMutedUrlCmd)
	copyMutedUrlCmd.Flags().StringP("video-path", "v", "", "Video url/path of video file")
	copyMutedUrlCmd.MarkFlagRequired("video-path")
}

var copyMutedUrlCmd = &cobra.Command{
	Use:   "copy-muted-url",
	Short: "Copy muted url",
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

		adapter.PrintMutedVideoUrl(ctx, modifier, uploader, os.Stdout)

	},
}
