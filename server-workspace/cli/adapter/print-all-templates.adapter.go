package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/template-service"
	"quickreel.com/core/util"
)

type PrintAllTemplatesOutput struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func PrintAllTemplates(ctx context.Context, templateService templateservice.ITemplateService, writer io.Writer) {
	templates, err := templateService.ListAll(ctx)

	if err != nil {
		panic(err)
	}

	result := make([]PrintAllTemplatesOutput, 0)

	for _, template := range templates {
		result = append(result, PrintAllTemplatesOutput{
			Id:   template.Id,
			Name: template.Name,
		})
	}

	resultJSON, err := util.ToJSON(result)

	if err != nil {
		panic(err)
	}

	fmt.Fprintln(writer, resultJSON)

}
