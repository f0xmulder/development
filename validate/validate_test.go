package validate

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

func TestFile(t *testing.T) {
	testCases := []struct {
		filePath   string
		wantValid  bool
		wantReason string
	}{
		{"file-extension.txt", false, "invalid extension .txt"},
		{"invalid-json.json", false, "invalid JSON"},
		{"missing-service-name.json", false, "the field service_name is missing"},
		{"missing-specification-url.json", true, ""},
		{"valid.json", true, ""},
	}

	rootFilePath := "./test-data/files"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.filePath), func(t *testing.T) {
			got := File(strings.Join([]string{rootFilePath, tc.filePath}, "/"))

			if got.Valid != tc.wantValid {
				t.Errorf("got Valid %s, want %s", strconv.FormatBool(got.Valid), strconv.FormatBool(tc.wantValid))
			}

			if got.Reason != tc.wantReason {
				t.Errorf("got Reason '%s', want '%s'", got.Reason, tc.wantReason)
			}
		})
	}
}

func TestDirectory(t *testing.T) {
	testCases := []struct {
		directoryPath string
		wantValid     bool
		wantReason    string
	}{
		{"with-invalid-file", false, "invalid-json.json - invalid JSON"},
		{"with-valid-and-invalid-file", false, "invalid-json.json - invalid JSON"},
		{"with-valid-file", true, ""},
	}

	rootDirectory := "./test-data/directories"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.directoryPath), func(t *testing.T) {
			fullPath := strings.Join([]string{rootDirectory, tc.directoryPath}, "/")
			got := Directory(fullPath)

			if got.Valid != tc.wantValid {
				t.Errorf("got valid %s, want %s", strconv.FormatBool(got.Valid), strconv.FormatBool(tc.wantValid))
			}

			if got.Reason != tc.wantReason {
				t.Errorf("got reason '%s', want '%s'", got.Reason, tc.wantReason)
			}
		})
	}
}
