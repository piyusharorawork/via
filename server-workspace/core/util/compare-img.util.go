package util

import (
	"image"
	_ "image/png"
	"os"
)

func CheckImagesEqual(img1Path, img2Path string) (bool, error) {

	img1, err := loadImage(img1Path)
	if err != nil {
		return false, err
	}

	img2, err := loadImage(img2Path)
	if err != nil {
		return false, err
	}

	bounds1 := img1.Bounds()
	bounds2 := img2.Bounds()

	if !bounds1.Eq(bounds2) {
		return false, nil
	}

	for y := bounds1.Min.Y; y < bounds1.Max.Y; y++ {
		for x := bounds1.Min.X; x < bounds1.Max.X; x++ {
			if img1.At(x, y) != img2.At(x, y) {
				return false, nil
			}
		}
	}
	return true, nil
}

func loadImage(path string) (image.Image, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	return img, err
}
