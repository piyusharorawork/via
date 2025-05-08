package cmd

import (
	"github.com/spf13/cobra"
	templateservice "quick-reel.com/service/src/template-service"
	clipinfostore "quick-reel.com/store/src/clipinfo-store"
	previewframestore "quick-reel.com/store/src/preview-frame-store"
	templatestore "quick-reel.com/store/src/template-store"
	"quickreel.com/cli/src/adapter"
	myctx "quickreel.com/core/src/ctx"
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
