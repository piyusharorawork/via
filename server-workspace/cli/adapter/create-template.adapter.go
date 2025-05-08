package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/template-service"
	climodels "quickreel.com/cli/cli-models"
	"quickreel.com/core/util"
)

func CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService, templateName string, websiteUrl string, out io.Writer) {
	input := templateservice.CreateTemplateInput{
		Name:       templateName,
		WebsiteUrl: websiteUrl,
		OnProgress: func(percent int, message string) {
			progressOutput := climodels.ProgressOutput{
				Percent: percent,
				Message: message,
			}
			json, err := util.ToJSON(progressOutput)
			if err != nil {
				panic(err)
			}
			fmt.Fprintln(out, json)
		},
	}

	_, err := templateService.Create(ctx, input)

	if err != nil {
		panic(err)
	}

}
