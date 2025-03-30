package model

type ContextKey string

const (
	YtDlpCliPath   ContextKey = "ytDlpCliPath"
	SpaceAccessKey ContextKey = "accessKey"
	SpaceSecretKey ContextKey = "secretKey"
	SpaceRegion    ContextKey = "region"
	SpaceName      ContextKey = "spaceName"
)
