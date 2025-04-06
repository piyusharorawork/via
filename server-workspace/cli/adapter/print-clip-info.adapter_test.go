package adapter

import (
	"bytes"
	"testing"

	"quickreel.com/core/clipinfo"
	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/util"
)

func TestPrintClipInfo(t *testing.T) {
	tt := []struct {
		name     string
		clipInfo clipinfo.IClipInfo
		stdout   string
		wantErr  bool
	}{
		{
			name: "success",
			clipInfo: &clipinfo.MockClipInfo{
				Fps:        30,
				FrameCount: 720,
				FrameSize: &clipinfo.FrameSize{
					Width:  854,
					Height: 480,
				},
			},
			stdout: `{"fps":30,"frameCount":720,"frameSize":{"height":480,"width":854}}`,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			buffer := &bytes.Buffer{}
			ctx := myctx.GetEmptyCtx()
			err := PrintClipInfo(ctx, tc.clipInfo, buffer)
			if (err != nil) != tc.wantErr {
				t.Errorf("printClipInfo() error = %v, wantErr %v", err, tc.wantErr)
				return
			}

			if !util.CompareJSON(buffer.String(), tc.stdout) {
				t.Errorf("printClipInfo() = %v, want %v", buffer.String(), tc.stdout)
			}

		})
	}

}
