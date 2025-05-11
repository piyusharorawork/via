package uploader

import (
	"context"
	"fmt"
	"io"
	"math"
	"mime"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"quickreel.com/core/src/model"
)

type uploadFileInput struct {
	FilePath         string
	FolderPath       string
	ProgressCallback func(percentage int)
}

type uploadFileOutput struct {
	Url         string
	FileName    string
	Size        int64
	ContentType string
}

// writeCounter counts bytes written and reports progress.
type writeCounter struct {
	Total      int64                 // total size of the file
	Written    int64                 // bytes written so far
	OnProgress func(percent float64) // callback for progress updates
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n := len(p)
	wc.Written += int64(n)
	percent := (float64(wc.Written) / float64(wc.Total)) * 100
	if wc.OnProgress != nil {
		wc.OnProgress(percent)
	}
	return n, nil
}

func uploadFile(ctx context.Context, input uploadFileInput) (uploadFileOutput, error) {
	accessKey := ctx.Value(model.SpaceAccessKey).(string)
	secretKey := ctx.Value(model.SpaceSecretKey).(string)
	region := ctx.Value(model.SpaceRegion).(string)
	spaceName := ctx.Value(model.SpaceName).(string)

	client, err := createClient(accessKey, secretKey, region)
	if err != nil {
		return uploadFileOutput{}, err
	}

	file, err := os.Open(input.FilePath)
	if err != nil {
		return uploadFileOutput{}, err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return uploadFileOutput{}, err
	}

	// Set up the progress counter
	counter := &writeCounter{
		Total: stat.Size(),
		OnProgress: func(percent float64) {
			if input.ProgressCallback != nil {
				percentInt := int(math.Floor(percent))
				input.ProgressCallback(percentInt)
			}

		},
	}
	// Wrap the file reader with TeeReader so that every byte read also goes to counter
	body := io.TeeReader(file, counter)

	contentType := mime.TypeByExtension(filepath.Ext(input.FilePath))
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	fileName := filepath.Base(input.FilePath)
	key := filepath.Join(input.FolderPath, fileName)

	_, err = client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:        aws.String(spaceName),
		Key:           aws.String(key),
		Body:          body,
		ContentType:   aws.String(contentType),
		ACL:           types.ObjectCannedACLPublicRead,
		ContentLength: aws.Int64(stat.Size()),
	})
	if err != nil {
		return uploadFileOutput{}, err
	}

	// Ensure final 100% is printed
	if input.ProgressCallback != nil {
		input.ProgressCallback(100)
	}

	videoURL := fmt.Sprintf("https://%s.%s.digitaloceanspaces.com/%s", spaceName, region, key)
	return uploadFileOutput{
		Url:         videoURL,
		FileName:    fileName,
		Size:        stat.Size(),
		ContentType: contentType,
	}, nil
}

func createClient(accessKey, secretKey, region string) (*s3.Client, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion(region),
	)
	if err != nil {
		return nil, err
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.digitaloceanspaces.com", region))
		o.UsePathStyle = false
	})

	return client, nil
}
