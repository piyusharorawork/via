package servicemodels

type TemplateFull struct {
	Id            string          `json:"id"`
	Name          string          `json:"name"`
	WebsiteUrl    string          `json:"websiteUrl"`
	VideoUrl      string          `json:"videoUrl"`
	AudioUrl      string          `json:"audioUrl"`
	ClipInfo      *ClipInfoFull   `json:"clipInfo"`
	PreviewFrames []*PreviewFrame `json:"previewFrames"`
}
