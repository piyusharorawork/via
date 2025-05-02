package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/template-service"
	"quickreel.com/core/util"
)

type CreateTemplateOutput struct {
	TemplateId string `json:"templateId"`
}

func CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService, templateName string, websiteUrl string, out io.Writer) {
	input := templateservice.CreateTemplateInput{
		Name:       templateName,
		WebsiteUrl: websiteUrl,
	}

	templateId, err := templateService.Create(ctx, input)

	if err != nil {
		panic(err)
	}

	output := &CreateTemplateOutput{
		TemplateId: templateId,
	}

	json, err := util.ToJSON(output)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(out, json)

}
