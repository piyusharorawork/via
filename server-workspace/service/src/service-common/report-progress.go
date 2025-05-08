package servicecommon

func ReportProgress(cb func(int, string), percent int, message string) {
	if cb != nil {
		cb(percent, message)
	}
}
