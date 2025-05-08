package extractor

type MockExtractorFactory struct {
}

func (extractorFactory *MockExtractorFactory) New(videoPath string, outputPath string, fps int) IExtractor {
	return &MockExtractor{}
}
