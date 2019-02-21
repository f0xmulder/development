package validate

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

func TestFile(t *testing.T) {
	testCases := []struct {
		filePath string
		want     bool
	}{
		{"file-extension.txt", false},
		{"invalid-json.json", false},
		{"missing-service-name.json", false},
		{"missing-specification-url.json", true},
		{"valid.json", true},
	}

	rootFilePath := "./test-data/files"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.filePath), func(t *testing.T) {
			if got := File(strings.Join([]string{rootFilePath, tc.filePath}, "/")); got != tc.want {
				t.Errorf("got %s, want %s", strconv.FormatBool(got), strconv.FormatBool(tc.want))
			}
		})
	}
}

func TestDirectory(t *testing.T) {
	testCases := []struct {
		directoryPath string
		want          bool
	}{
		{"with-invalid-file", false},
		{"with-valid-and-invalid-file", false},
		{"with-valid-file", true},
	}

	rootDirectory := "./test-data/directories"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.directoryPath), func(t *testing.T) {
			if got := Directory(strings.Join([]string{rootDirectory, tc.directoryPath}, "/")); got != tc.want {
				t.Errorf("got %s, want %s", strconv.FormatBool(got), strconv.FormatBool(tc.want))
			}
		})
	}
}
