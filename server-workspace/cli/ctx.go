package main

import (
	"context"
	"os"

	"github.com/joho/godotenv"
	model "quick-reel.com/models"
)

func createCtx() (context.Context, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	ctx = context.WithValue(ctx, model.SpaceAccessKey, os.Getenv("ACCESS_KEY"))
	ctx = context.WithValue(ctx, model.SpaceSecretKey, os.Getenv("SECRET_KEY"))
	ctx = context.WithValue(ctx, model.SpaceRegion, os.Getenv("REGION"))
	ctx = context.WithValue(ctx, model.SpaceName, os.Getenv("SPACE_NAME"))

	return ctx, nil
}
