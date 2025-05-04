package handler

import (
	"bytes"
	"net/http"
)

type Writer interface {
	Write([]byte) (int, error)
	Header() http.Header
}

type MockWriter struct {
	Body *bytes.Buffer
}

func (writer *MockWriter) Write(p []byte) (int, error) {
	writer.Body.Write(p)
	return len(p), nil
}

func (writer *MockWriter) Header() http.Header {
	return http.Header{}
}

func (writer *MockWriter) Flush() {

}
