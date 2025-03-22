package main

import (
	"context"
	"os"

	"github.com/joho/godotenv"
	"quickreel.com/core/model"
)

func createCtx() (context.Context, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	ctx = context.WithValue(ctx, model.SpaceAccessKey, os.Getenv("SPACE_ACCESS_KEY"))
	ctx = context.WithValue(ctx, model.SpaceSecretKey, os.Getenv("SPACE_SECRET_KEY"))
	ctx = context.WithValue(ctx, model.SpaceRegion, os.Getenv("SPACE_REGION"))
	ctx = context.WithValue(ctx, model.SpaceName, os.Getenv("SPACE_NAME"))

	return ctx, nil
}
