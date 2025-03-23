package util

import "time"

func TimeTaken(f func()) time.Duration {
	start := time.Now()
	f()
	return time.Since(start)
}
