package model

type Transition struct {
	StartFrame int
	EndFrame   int
	Info       *TransitionInfo
}

type TransitionInfo struct {
	Type    string
	Grid    *LayoutGrid
	Content []*LayoutContent
}

type LayoutGrid struct {
	Rows    int
	Columns int
}

type LayoutContent struct {
	Row      int
	Column   int
	Kind     string
	MediaUrl string
}
