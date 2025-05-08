package adapter

import (
	"context"
	"fmt"
	"io"

	templateservice "quick-reel.com/service/src/template-service"
	"quickreel.com/core/src/util"
)

type PrintAllTemplatesOutput struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	VideoUrl string `json:"videoUrl"`
}

func PrintAllTemplates(ctx context.Context, templateService templateservice.ITemplateService, writer io.Writer) {
	templates, err := templateService.ListAll(ctx)

	if err != nil {
		panic(err)
	}

	result := make([]PrintAllTemplatesOutput, 0)

	for _, template := range templates {
		result = append(result, PrintAllTemplatesOutput{
			Id:       template.Id,
			Name:     template.Name,
			VideoUrl: template.VideoUrl,
		})
	}

	resultJSON, err := util.ToJSON(result)

	if err != nil {
		panic(err)
	}

	fmt.Fprintln(writer, resultJSON)

}
