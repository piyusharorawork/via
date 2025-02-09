package uploader

import (
	"context"
	"fmt"
	"mime"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

type UploadFileInput struct {
	VideoPath string
	SpaceName string
	Region    string
	AccessKey string
	SecretKey string
}

type UploadFileOutput struct {
	Url         string
	FileName    string
	Size        int64
	ContentType string
}

func UploadFile(input UploadFileInput) (UploadFileOutput, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(input.AccessKey, input.SecretKey, "")),
		config.WithRegion(input.Region),
	)

	if err != nil {
		return UploadFileOutput{}, err
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.digitaloceanspaces.com", input.Region))
		o.UsePathStyle = false // Ensure virtual-hosted-style URLs
	})

	file, err := os.Open(input.VideoPath)

	if err != nil {
		return UploadFileOutput{}, err
	}

	defer file.Close()

	stat, err := file.Stat()

	if err != nil {
		return UploadFileOutput{}, err
	}

	contentType := mime.TypeByExtension(filepath.Ext(input.VideoPath))

	if contentType == "" {
		contentType = "application/octet-stream"
	}

	fileName := filepath.Base(input.VideoPath)

	bucket := aws.String(input.SpaceName)
	key := aws.String(fileName)
	contentTypePtr := aws.String(contentType)
	acl := types.ObjectCannedACLPublicRead

	_, err = client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      bucket,
		Key:         key,
		Body:        file,
		ContentType: contentTypePtr,
		ACL:         acl,
	})

	if err != nil {
		return UploadFileOutput{}, err
	}

	videoURL := fmt.Sprintf("https://%s.%s.digitaloceanspaces.com/%s", input.SpaceName, input.Region, fileName)

	return UploadFileOutput{
		Url:         videoURL,
		FileName:    fileName,
		Size:        stat.Size(),
		ContentType: contentType,
	}, nil

}
