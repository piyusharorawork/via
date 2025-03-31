package util

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"
	"sync"
)

type StreamCommandInput struct {
	Cmd      *exec.Cmd
	Callback func(string)
}

func StreamCommand(input StreamCommandInput) error {
	cmd := input.Cmd

	// Get stdout and stderr pipes
	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to get stdout: %w", err)
	}

	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("failed to get stderr: %w", err)
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start command: %w", err)
	}

	// Use WaitGroup to ensure both streams are fully read
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		streamOutput(stdoutPipe, input.Callback)
	}()

	go func() {
		defer wg.Done()
		streamOutput(stderrPipe, input.Callback)
	}()

	// Wait for both streams to be read completely
	wg.Wait()

	// Wait for command to finish execution
	if err := cmd.Wait(); err != nil {
		return fmt.Errorf("command execution failed: %w", err)
	}

	return nil
}

// Stream output from reader to writer in real-time
func streamOutput(pipe io.ReadCloser, callback func(string)) {
	scanner := bufio.NewScanner(pipe)
	for scanner.Scan() {
		callback(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		callback(fmt.Sprintf("error reading output: %v", err))
	}
}
