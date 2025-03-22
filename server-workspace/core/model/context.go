package model

type ContextKey string

const (
	SpaceAccessKey ContextKey = "accessKey"
	SpaceSecretKey ContextKey = "secretKey"
	SpaceRegion    ContextKey = "region"
	SpaceName      ContextKey = "spaceName"
)
