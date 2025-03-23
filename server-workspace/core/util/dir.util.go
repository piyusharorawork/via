package util

import "os"

func RemoveDir(dirPath string) error {
	if err := os.RemoveAll(dirPath); err != nil && !os.IsNotExist(err) {
		return err
	}
	return nil
}

func EnsureDir(dirPath string) error {
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		return os.MkdirAll(dirPath, os.ModePerm)
	}
	return nil
}
