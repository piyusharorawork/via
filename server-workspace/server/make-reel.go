package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/google/uuid"
	"quickreel.com/core/model"
	"quickreel.com/core/uploader"
	"quickreel.com/core/util"
	"quickreel.com/core/vidmod"
	"quickreel.com/core/workflow"
)

const uploadDir = "/Users/piyusharora/projects/via/assets/temp"
const layersPath = "/Users/piyusharora/projects/via/assets/temp/layers.json"

func makeReel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Header().Set("Transfer-Encoding", "chunked")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	sendChunk(w, flusher, "Uploading ...", 1)
	originalVideoFileName := fmt.Sprintf("%s.mp4", uuid.NewString())

	uploadFile(w, r, originalVideoFileName)
	originalVideoPath := filepath.Join(uploadDir, originalVideoFileName)
	defer util.RemoveFile(originalVideoPath)

	ctx, err := createCtx()

	if err != nil {
		http.Error(w, "unable to create ctx", http.StatusInternalServerError)
		return
	}

	sendChunk(w, flusher, "Processing your video ...", 3)
	original720pVideoUrl, err := getOriginal720pVideoUrl(ctx, originalVideoPath)
	if err != nil {
		http.Error(w, "Failed to get original 720p video url", http.StatusInternalServerError)
		return
	}

	layers := getLayers()

	reelUrl, err := workflow.GenerateMedia(ctx, workflow.GenerateMediaInput{
		OriginalVideoUrl: original720pVideoUrl,
		Layers:           layers,
		LayersJSONPath:   layersPath,
		VideoName:        uuid.NewString(),
		Cb: func(progress int, msg string) {
			sendChunk(w, flusher, msg, progress)
		},
	})

	if err != nil {
		http.Error(w, "Failed to generate reel", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, reelUrl)

}

func uploadFile(w http.ResponseWriter, r *http.Request, fileName string) {
	if err := r.ParseMultipartForm(10 << 20); err != nil { // 10 MB max file size
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		http.Error(w, "Failed to create upload directory", http.StatusInternalServerError)
		return
	}

	filePath := filepath.Join(uploadDir, fileName)
	outFile, err := os.Create(filePath)
	if err != nil {
		http.Error(w, "Failed to create file", http.StatusInternalServerError)
		return
	}
	defer outFile.Close()

	if _, err := io.Copy(outFile, file); err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}
}

func getOriginal720pVideoUrl(ctx context.Context, originalVideoPath string) (string, error) {
	original720pVideoFileName := fmt.Sprintf("%s-720p.mp4", uuid.NewString())
	original720pVideoFilePath := filepath.Join(uploadDir, original720pVideoFileName)
	vidmod.ResizeVideo(vidmod.ResizeVideoInput{
		VideoPath:  originalVideoPath,
		OutputPath: original720pVideoFilePath,
		Resolution: model.HD_720p,
	})
	defer util.RemoveFile(original720pVideoFilePath)

	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)
	folderPath := "temp"

	data, err := uploader.UploadFile(uploader.UploadFileInput{
		FilePath:   original720pVideoFilePath,
		FolderPath: folderPath,
		SpaceName:  spaceName,
		Region:     region,
		AccessKey:  accessKey,
		SecretKey:  secretKey,
	})

	if err != nil {
		return "", err
	}

	return data.Url, nil

}

func getLayers() []*model.Layer {
	return []*model.Layer{
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   27,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 28,
					End:   57,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 58,
					End:   61,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 62,
					End:   63,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 64,
					End:   66,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 67,
					End:   69,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 70,
					End:   72,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 73,
					End:   75,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 76,
					End:   78,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 79,
					End:   81,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 82,
					End:   84,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 85,
					End:   87,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 88,
					End:   90,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 91,
					End:   93,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 94,
					End:   96,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 97,
					End:   99,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 100,
					End:   102,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 103,
					End:   105,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 106,
					End:   108,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 109,
					End:   126,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 127,
					End:   172,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 173,
					End:   212,
					Content: &model.SegmentContent{
						Type: "dissolve", // todo dissolve
					},
				},
				{
					Start: 213,
					End:   246,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 247,
					End:   258,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 259,
					End:   272,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 273,
					End:   285,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 286,
					End:   299,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 300,
					End:   312,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 313,
					End:   326,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 1,
						},
					},
				},
				{
					Start: 327,
					End:   363,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0.7,
						},
					},
				},
				{
					Start: 364,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0.7,
						},
					},
				},
			},
		},
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   341,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 342,
					End:   378,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0,
						},
					},
				},
				{
					Start: 379,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      0,
						},
					},
				},
			},
		},
		{
			Segments: []*model.Segment{
				{
					Start: 1,
					End:   353,
					Content: &model.SegmentContent{
						Type: "empty",
					},
				},
				{
					Start: 354,
					End:   392,
					Content: &model.SegmentContent{
						Type: "image",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      -0.7,
						},
					},
				},
				{
					Start: 393,
					End:   422,
					Content: &model.SegmentContent{
						Type: "video",
						Region: &model.Region{
							Width:  1,
							Height: 0.30,
							Y:      -0.7,
						},
					},
				},
			},
		},
	}

}

func sendChunk(w http.ResponseWriter, flusher http.Flusher, msg string, progress int) {
	message := fmt.Sprintf("%s,%d", msg, progress)
	fmt.Fprint(w, message)
	flusher.Flush() // Flush the response to the client
}
