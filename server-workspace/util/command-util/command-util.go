package util

import (
	"bytes"
	"os/exec"
)

func RunCommand(cmd *exec.Cmd) (string, error) {
	var stdout, stderr bytes.Buffer

	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		println(stderr.String())
		return "", err
	}

	output := stdout.String()
	return output, nil
}
