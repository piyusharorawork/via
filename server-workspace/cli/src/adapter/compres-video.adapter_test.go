package adapter

import (
	"testing"

	myctx "quickreel.com/core/src/ctx"
	"quickreel.com/core/src/vidmod"
)

func TestCompressVideo(t *testing.T) {
	tt := []struct {
		name       string
		resolution string
	}{
		{
			name:       "Success",
			resolution: "ULTRA_HD_2160p",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			modifier := &vidmod.MockVideoModifier{}
			CompressVideo(ctx, modifier, tc.resolution)
			if !modifier.CompressVideoCalled {
				t.Errorf("CompressVideo not called")
			}

		})
	}

}
