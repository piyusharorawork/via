package model

/*
ContextKey is a type alias for string
Must be defined to avoid collision
*/
type ContextKey string

const (
	FFProbePath    ContextKey = "FF_PROBE_PATH"
	FFMpegPath     ContextKey = "FFMPEG_PATH"
	YtDlpCliPath   ContextKey = "YT_DLP_CLI_PATH"
	SpaceAccessKey ContextKey = "accessKey"
	SpaceSecretKey ContextKey = "secretKey"
	SpaceRegion    ContextKey = "region"
	SpaceName      ContextKey = "spaceName"
)
