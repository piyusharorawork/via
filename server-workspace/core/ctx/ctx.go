package myctx

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"quickreel.com/core/model"
)

func createCtx() (context.Context, error) {
	ctx := context.Background()

	envs := map[interface{}]string{
		model.FFProbePath:    os.Getenv("FF_PROBE_PATH"),
		model.FFMpegPath:     os.Getenv("FFMPEG_PATH"),
		model.YtDlpCliPath:   os.Getenv("YT_DLP_CLI_PATH"),
		model.SpaceAccessKey: os.Getenv("SPACE_ACCESS_KEY"),
		model.SpaceSecretKey: os.Getenv("SPACE_SECRET_KEY"),
		model.SpaceRegion:    os.Getenv("SPACE_REGION"),
		model.SpaceName:      os.Getenv("SPACE_NAME"),
	}

	for key, val := range envs {
		if val == "" {
			return ctx, fmt.Errorf("no %s provided", key)
		}

		ctx = context.WithValue(ctx, key, val)
	}

	return ctx, nil
}

/*
Generates context to be used when env needs to be loader from .env file
*/
func GetCtx() (context.Context, error) {
	// Load .env file which may or may not exist
	godotenv.Load()
	return createCtx()
}

/*
Generates context to be used when env needs to be loader from .env.test file
*/
func GetTestCtx() (context.Context, error) {
	// Load .env.test file which may or may not exist
	godotenv.Load("/Users/piyusharora/projects/via/server-workspace/.env.test") // TODO use relative path
	return createCtx()
}

/*
Generates context to be used for unit testing
*/
func GetEmptyCtx() context.Context {
	return context.Background()
}
