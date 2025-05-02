package cmd

import (
	"os"

	"github.com/spf13/cobra"
	templateservice "quick-reel.com/service/template-service"
	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/cli/adapter"
	"quickreel.com/core/clipinfo"
	myctx "quickreel.com/core/ctx"
	extractor "quickreel.com/core/extractor"
	"quickreel.com/core/uploader"
)

func init() {
	RootCmd.AddCommand(createTemplateCmd)
	createTemplateCmd.Flags().StringP("website-url", "u", "", "website url containing video and audio")
	createTemplateCmd.MarkFlagRequired("website-url")
	createTemplateCmd.Flags().StringP("template-name", "n", "", "template name")
	createTemplateCmd.MarkFlagRequired("template-name")
}

var createTemplateCmd = &cobra.Command{
	Use:   "create-template",
	Short: "Create template",
	Long:  `Create template`,
	Run: func(cmd *cobra.Command, args []string) {
		websiteUrl, err := cmd.Flags().GetString("website-url")

		if err != nil {
			panic(err)
		}

		templateName, err := cmd.Flags().GetString("template-name")

		if err != nil {
			panic(err)
		}

		templateService := &templateservice.TemplateService{
			MediaCreator:      &templateservice.MediaCreator{},
			ClipInfoFactory:   &clipinfo.ClipInfoFactory{},
			ExtractorFactory:  &extractor.ExtractorFactory{},
			UploaderFactory:   &uploader.UploaderFactory{},
			ClipInfoStore:     &clipinfostore.ClipInfoStore{},
			TemplateStore:     &templatestore.TemplateStore{},
			PreviewFrameStore: &previewframestore.PreviewFrameStore{},
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		adapter.CreateTemplate(ctx, templateService, templateName, websiteUrl, os.Stdout)

	},
}
