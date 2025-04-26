package util

import (
	"fmt"
	"time"
)

func TimeTaken(f func()) time.Duration {
	start := time.Now()
	f()
	return time.Since(start)
}

func TimeTrack(start time.Time, name string) {
	elapsed := time.Since(start)
	fmt.Printf("%s took %s\n", name, elapsed)
}
