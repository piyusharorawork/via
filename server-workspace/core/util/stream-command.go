package util

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"
)

type StreamCommandInput struct {
	Cmd      *exec.Cmd
	Callback func(string)
}

// https://chatgpt.com/c/67c3d0c9-e2a0-8006-a7c7-0dd4a428ab79
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

	// Create goroutines to read stdout and stderr
	go streamOutput(stdoutPipe, input.Callback) // Print stdout to console
	go streamOutput(stderrPipe, input.Callback) // Print stderr to console

	// Wait for the command to finish
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
}
