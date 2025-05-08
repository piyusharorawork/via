package util

import (
	"crypto/md5"
	"io"
	"os"
)

/*
Compares two files and returns true if they are equal using md5 hash
*/
func AreFilesEqual(path1, path2 string) (bool, error) {
	file1, err := os.Open(path1)
	if err != nil {
		return false, err
	}
	defer file1.Close()

	file2, err := os.Open(path2)
	if err != nil {
		return false, err
	}
	defer file2.Close()

	hash1 := md5.New()
	if _, err := io.Copy(hash1, file1); err != nil {
		return false, err
	}

	hash2 := md5.New()
	if _, err := io.Copy(hash2, file2); err != nil {
		return false, err
	}

	return string(hash1.Sum(nil)) == string(hash2.Sum(nil)), nil
}
