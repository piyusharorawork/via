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
	ctx = context.WithValue(ctx, model.AccessKey, os.Getenv("ACCESS_KEY"))
	ctx = context.WithValue(ctx, model.SecretKey, os.Getenv("SECRET_KEY"))
	ctx = context.WithValue(ctx, model.Region, os.Getenv("REGION"))
	ctx = context.WithValue(ctx, model.SpaceName, os.Getenv("SPACE_NAME"))

	return ctx, nil
}
