package extractor

import "context"

type MockExtractor struct {
}

func (m *MockExtractor) ExtractImage(ctx context.Context, frameNo int) error {
	return nil
}
