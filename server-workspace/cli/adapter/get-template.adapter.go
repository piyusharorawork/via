package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/template-service"
	"quickreel.com/core/util"
)

func PrintTemplate(ctx context.Context, id string, templateService templateservice.ITemplateService, writer io.Writer) {
	template, err := templateService.Get(ctx, id)

	if err != nil {
		panic(err)
	}

	templateJSON, err := util.ToJSON(template)

	if err != nil {
		panic(err)
	}

	fmt.Fprintln(writer, templateJSON)

}
