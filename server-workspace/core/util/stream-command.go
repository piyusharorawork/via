package util

import (
	"fmt"
	"io"
	"os/exec"
	"sync"
)

type StreamCommandInput struct {
	Cmd      *exec.Cmd
	Callback func(string)
}

/*
https://chatgpt.com/c/681c48d3-6098-8006-967b-e1916368ed91
1. Replaced bufio.Scanner with pipe.Read(...) to read raw bytes.
2. Callback is called as soon as any chunk is read, regardless of line endings.
3.Ensures responsiveness for stream data like progress bars or real-time logs.
*/
func StreamCommand(input StreamCommandInput) error {
	cmd := input.Cmd

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to get stdout: %w", err)
	}

	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("failed to get stderr: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start command: %w", err)
	}

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		streamOutputNonBlocking(stdoutPipe, input.Callback)
	}()

	go func() {
		defer wg.Done()
		streamOutputNonBlocking(stderrPipe, input.Callback)
	}()

	wg.Wait()

	if err := cmd.Wait(); err != nil {
		return fmt.Errorf("command execution failed: %w", err)
	}

	return nil
}

// Stream output from reader and invoke callback on any data change
func streamOutputNonBlocking(pipe io.ReadCloser, callback func(string)) {
	defer pipe.Close()
	buf := make([]byte, 1024)
	for {
		n, err := pipe.Read(buf)
		if n > 0 {
			callback(string(buf[:n]))
		}
		if err != nil {
			if err != io.EOF {
				callback(fmt.Sprintf("error reading output: %v", err))
			}
			break
		}
	}
}
