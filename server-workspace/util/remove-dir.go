package util

import "os"

func RemoveDir(dirPath string) error {
	if err := os.RemoveAll(dirPath); err != nil && !os.IsNotExist(err) {
		return err
	}
	return nil
}
