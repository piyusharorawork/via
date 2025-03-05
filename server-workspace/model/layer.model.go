package model

type Layer struct {
	Segments []*Segment
}

type Segment struct {
	Start   int
	End     int
	Content *SegmentContent
}

type SegmentContent struct {
	Type   string
	Url    string
	Region *Region
}

type Region struct {
	X      float32
	Y      float32
	Width  float32
	Height float32
}
