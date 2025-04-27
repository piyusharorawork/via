package storemodels

type Template struct {
	Id         string
	Name       string
	WebsiteUrl string
	VideoUrl   string
	AudioUrl   string
	ClipInfo   ClipInfo
	CreatedAt  string
	UpdatedAt  string
}
