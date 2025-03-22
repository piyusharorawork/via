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
	FilePath   string
	FolderPath string
	SpaceName  string
	Region     string
	AccessKey  string
	SecretKey  string
}

type UploadFileOutput struct {
	Url         string
	FileName    string
	Size        int64
	ContentType string
}

func UploadFile(input UploadFileInput) (UploadFileOutput, error) {
	client, err := createClient(input.AccessKey, input.SecretKey, input.Region)
	if err != nil {
		return UploadFileOutput{}, err
	}

	file, err := os.Open(input.FilePath)
	if err != nil {
		return UploadFileOutput{}, err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return UploadFileOutput{}, err
	}

	contentType := mime.TypeByExtension(filepath.Ext(input.FilePath))
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	fileName := filepath.Base(input.FilePath)
	key := filepath.Join(input.FolderPath, fileName)

	_, err = client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String(input.SpaceName),
		Key:         aws.String(key),
		Body:        file,
		ContentType: aws.String(contentType),
		ACL:         types.ObjectCannedACLPublicRead,
	})

	if err != nil {
		return UploadFileOutput{}, err
	}

	videoURL := fmt.Sprintf("https://%s.%s.digitaloceanspaces.com/%s", input.SpaceName, input.Region, key)

	return UploadFileOutput{
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
