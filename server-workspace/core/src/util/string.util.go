package util

import "strings"

func StringSliceContains(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}

func StringPtr(s string) *string {
	return &s
}

/*
Compares two strings ignoring whitespaces and case
*/
func AreStringsEqual(s1 string, s2 string) bool {
	trimmedS1 := strings.TrimSpace(s1)
	trimmedS1 = strings.Replace(trimmedS1, "\n", "", -1)
	trimmedS2 := strings.TrimSpace(s2)
	trimmedS2 = strings.Replace(trimmedS2, "\n", "", -1)

	return strings.EqualFold(trimmedS1, trimmedS2)
}
