package model

type ContextKey string

const (
	AccessKeyKey ContextKey = "accessKey"
	SecretKeyKey ContextKey = "secretKey"
	RegionKey    ContextKey = "region"
	SpaceNameKey ContextKey = "spaceName"
)
