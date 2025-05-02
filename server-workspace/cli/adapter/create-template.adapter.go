package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/template-service"
	"quickreel.com/core/util"
)

func CreateTemplate(ctx context.Context, templateService templateservice.ITemplateService, templateName string, websiteUrl string, out io.Writer) {
	input := templateservice.CreateTemplateInput{
		Name:       templateName,
		WebsiteUrl: websiteUrl,
	}

	templateId, err := templateService.Create(ctx, input)

	if err != nil {
		panic(err)
	}

	template, err := templateService.Get(ctx, templateId)

	if err != nil {
		panic(err)
	}

	json, err := util.ToJSON(template)

	if err != nil {
		panic(err)
	}

	fmt.Fprint(out, json)

}
