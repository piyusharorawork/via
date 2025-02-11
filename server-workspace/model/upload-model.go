package model

type ContextKey string

const (
	AccessKey ContextKey = "accessKey"
	SecretKey ContextKey = "secretKey"
	Region    ContextKey = "region"
	SpaceName ContextKey = "spaceName"
)
