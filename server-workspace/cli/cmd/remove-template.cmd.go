package cmd

import (
	"github.com/spf13/cobra"
	templateservice "quick-reel.com/service/template-service"
	clipinfostore "quick-reel.com/store/clipinfo-store"
	previewframestore "quick-reel.com/store/preview-frame-store"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
)

func init() {
	RootCmd.AddCommand(removeTemplateCmd)
	removeTemplateCmd.Flags().StringP("template-id", "t", "", "template id")
	removeTemplateCmd.MarkFlagRequired("template-id")
}

var removeTemplateCmd = &cobra.Command{
	Use:   "remove-template",
	Short: "remove template",
	Run: func(cmd *cobra.Command, args []string) {
		templateId, err := cmd.Flags().GetString("template-id")

		if err != nil {
			panic(err)
		}

		templateService := &templateservice.TemplateService{
			TemplateStore:     &templatestore.TemplateStore{},
			ClipInfoStore:     &clipinfostore.ClipInfoStore{},
			PreviewFrameStore: &previewframestore.PreviewFrameStore{},
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		adapter.RemoveTemplate(ctx, templateId, templateService)

	},
}
