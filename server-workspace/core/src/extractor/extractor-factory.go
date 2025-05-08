package extractor

type IExtractorFactory interface {
	New(videoPath string, outputPath string, fps int) IExtractor
}

type ExtractorFactory struct{}

func (extractorFactory *ExtractorFactory) New(videoPath string, outputPath string, fps int) IExtractor {
	return &Extractor{
		VideoPath:  videoPath,
		OutputPath: outputPath,
		Fps:        fps,
	}
}
