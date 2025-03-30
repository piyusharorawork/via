package clicontext

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"quickreel.com/core/model"
)

func CreateCtx() (context.Context, error) {
	// Load .env file which may or may not exist
	godotenv.Load()
	ctx := context.Background()

	envs := map[interface{}]string{
		model.FFProbePath:  os.Getenv("FF_PROBE_PATH"),
		model.YtDlpCliPath: os.Getenv("YT_DLP_CLI_PATH"),
	}

	for key, val := range envs {
		if val == "" {
			return ctx, fmt.Errorf("no %s provided", key)
		}

		ctx = context.WithValue(ctx, key, val)
	}

	return ctx, nil
}
