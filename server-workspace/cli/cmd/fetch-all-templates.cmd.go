package cmd

import (
	"os"

	"github.com/spf13/cobra"
	templateservice "quick-reel.com/service/template-service"
	templatestore "quick-reel.com/store/template-store"
	"quickreel.com/cli/adapter"
	myctx "quickreel.com/core/ctx"
)

func init() {
	RootCmd.AddCommand(fetchAllTemplatesCmd)
}

var fetchAllTemplatesCmd = &cobra.Command{
	Use:   "fetch-all-templates",
	Short: "Fetch all templates",
	Run: func(cmd *cobra.Command, args []string) {
		templateService := &templateservice.TemplateService{
			TemplateStore: &templatestore.TemplateStore{},
		}

		ctx, err := myctx.GetCtx()

		if err != nil {
			panic(err)
		}

		adapter.PrintAllTemplates(ctx, templateService, os.Stdout)
	},
}
