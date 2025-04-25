package myctx

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"quickreel.com/core/model"
	"quickreel.com/core/util"
)

func createCtx() (context.Context, error) {
	ctx := context.Background()

	envs := map[interface{}]string{
		model.FFProbePath:        os.Getenv("FF_PROBE_PATH"),
		model.FFMpegPath:         os.Getenv("FFMPEG_PATH"),
		model.YtDlpCliPath:       os.Getenv("YT_DLP_CLI_PATH"),
		model.SpaceAccessKey:     os.Getenv("SPACE_ACCESS_KEY"),
		model.SpaceSecretKey:     os.Getenv("SPACE_SECRET_KEY"),
		model.SpaceRegion:        os.Getenv("SPACE_REGION"),
		model.SpaceName:          os.Getenv("SPACE_NAME"),
		model.TempDirPath:        os.Getenv("TEMP_DIR_PATH"),
		model.TestSamplesDirPath: os.Getenv("TEST_SAMPLES_DIR_PATH"),
		model.DbPath:             os.Getenv("DB_PATH"),
	}

	for key, val := range envs {

		ctx = context.WithValue(ctx, key, val)
	}

	return ctx, nil
}

/*
Generates context to be used when env needs to be loader from .env file
*/
func GetCtx() (context.Context, error) {
	envPath := os.Getenv("ENV_PATH")

	if envPath == "" {
		return createCtx()
	}

	if !util.IsPathExists(envPath) {
		return nil, fmt.Errorf("%s not exist", envPath)
	}
	godotenv.Load(envPath)
	return createCtx()
}

/*
Generates context to be used when env needs to be loader from TEST_ENV_PATH file
*/
func GetTestCtx() (context.Context, error) {
	absPath, err := filepath.Abs(".")

	if err != nil {
		return nil, err
	}

	envPath := filepath.Join(absPath, "../../../assets/environments/.env.test")

	if !util.IsPathExists(envPath) {
		return nil, fmt.Errorf("%s not exist", envPath)
	}

	godotenv.Load(envPath)

	return createCtx()
}

/*
Generates context to be used for unit testing
*/
func GetEmptyCtx() context.Context {
	return context.Background()
}

/* Get the value from ctx
 */

func GetValue(ctx context.Context, key model.ContextKey) (string, error) {
	value, ok := ctx.Value(key).(string)

	if !ok {
		return "", fmt.Errorf("no %s provided", key)
	}

	if value == "" {
		return "", fmt.Errorf("%s is empty", key)
	}

	return value, nil
}
