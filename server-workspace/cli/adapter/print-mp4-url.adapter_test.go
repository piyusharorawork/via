package adapter

import (
	"bytes"
	"testing"

	myctx "quickreel.com/core/ctx"
	"quickreel.com/core/uploader"
	"quickreel.com/core/vidmod"
)

func TestPrintConvertToMp4Output(t *testing.T) {
	tt := []struct {
		name string
		want string
	}{
		{
			name: "Conversion success",
			want: "{\"url\":\"https://video-url.mp4\"}",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			ctx := myctx.GetEmptyCtx()
			modifier := &vidmod.VideoModifierMock{}
			uploader := &uploader.MockUploader{
				Url: "https://video-url.mp4",
			}
			buf := &bytes.Buffer{}
			PrintMp4Url(ctx, modifier, uploader, buf)
			if buf.String() != tc.want {
				t.Errorf("printConvertToMp4Output() = %v, want %v", buf.String(), tc.want)
			}
		})
	}

}
