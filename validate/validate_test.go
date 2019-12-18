package validate

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

const INVALID_JSON_PREFIX = "invalid JSON: "

func TestFile(t *testing.T) {
	testCases := []struct {
		filePath         string
		wantValid        bool
		wantReasonPrefix string
		wantReason       string
	}{
		{"file-extension.txt", false, "", "invalid extension .txt"},
		{"missing-service-name.json", false, "", "the field service_name is missing"},
		{"missing-organization-name.json", false, "", "the field organization_name is missing"},
		{"missing-api-type.json", false, "", INVALID_JSON_PREFIX + "the field api_type is empty or missing"},
		{"missing-api-url.json", false, "", "the field api_url is missing"},
		{"missing-documentation-url.json", false, "", "the field documentation_url is missing"},
		{"missing-specification-url.json", true, "", ""},
		{"missing-tags.json", true, "", ""},
		{"missing-badges.json", true, "", ""},
		{"missing-contact.json", true, "", ""},
		{"empty-api-type.json", false, "", INVALID_JSON_PREFIX + "the field api_type is empty or missing"},
		{"invalid-json.json", false, INVALID_JSON_PREFIX, ""},
		{"invalid-type-api-type.json", false, INVALID_JSON_PREFIX, ""},
		{"invalid-val-api-type.json", false, "", INVALID_JSON_PREFIX + "invalid value for the field api_type"},
		{"invalid-tags.json", false, INVALID_JSON_PREFIX, ""},
		{"invalid-contact.json", false, INVALID_JSON_PREFIX, ""},
		{"valid.json", true, "", ""},
	}

	rootFilePath := "./test-data/files"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.filePath), func(t *testing.T) {
			got := File(strings.Join([]string{rootFilePath, tc.filePath}, "/"))

			EvaluateTestResult(t, got, tc.wantValid, tc.wantReasonPrefix, tc.wantReason)
		})
	}
}

func TestDirectory(t *testing.T) {
	testCases := []struct {
		directoryPath    string
		wantValid        bool
		wantReasonPrefix string
		wantReason       string
	}{
		{"with-invalid-file", false, "invalid-json.json - " + INVALID_JSON_PREFIX, ""},
		{"with-valid-and-invalid-file", false, "invalid-json.json - " + INVALID_JSON_PREFIX, ""},
		{"with-valid-file", true, "", ""},
	}

	rootDirectory := "./test-data/directories"

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.directoryPath), func(t *testing.T) {
			fullPath := strings.Join([]string{rootDirectory, tc.directoryPath}, "/")
			got := Directory(fullPath)

			EvaluateTestResult(t, got, tc.wantValid, tc.wantReasonPrefix, tc.wantReason)
		})
	}
}

func EvaluateTestResult(
	t               *testing.T,
	got              ValidationFeedback,
	wantValid        bool,
	wantReasonPrefix string,
	wantReason       string,
) {
	if got.Valid != wantValid {
		t.Errorf("got Valid %s, want %s", strconv.FormatBool(got.Valid), strconv.FormatBool(wantValid))
	}

	if !strings.HasPrefix(got.Reason, wantReasonPrefix) {
		t.Errorf(
			"got Reason '%s', expected it to start with prefix: '%s'",
			got.Reason,
			wantReasonPrefix)
	}

	if wantReason != "" && got.Reason != wantReason {
		t.Errorf("got Reason '%s', want '%s'", got.Reason, wantReason)
	}
}
