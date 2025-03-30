package clicontext

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"quickreel.com/core/model"
)

const (
	NO_YT_DLP_CLI_PATH_ERROR = "no yt-dlp cli path provided"
)

func CreateCtx() (context.Context, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Warning: No .env file found or failed to load")
	}

	ctx := context.Background()
	ytDlpCliPath, err := getYTDlpCliPath()

	if err != nil {
		return nil, err
	}

	ctx = context.WithValue(ctx, model.YtDlpCliPath, ytDlpCliPath)
	//TODO
	ctx = context.WithValue(ctx, model.SpaceAccessKey, os.Getenv("SPACE_ACCESS_KEY"))
	ctx = context.WithValue(ctx, model.SpaceSecretKey, os.Getenv("SPACE_SECRET_KEY"))
	ctx = context.WithValue(ctx, model.SpaceRegion, os.Getenv("SPACE_REGION"))
	ctx = context.WithValue(ctx, model.SpaceName, os.Getenv("SPACE_NAME"))

	return ctx, nil
}

func getYTDlpCliPath() (string, error) {
	val := os.Getenv("YT_DLP_CLI_PATH")

	if val == "" {
		return "", errors.New(NO_YT_DLP_CLI_PATH_ERROR)
	}

	return val, nil

}
