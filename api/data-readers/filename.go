package data_readers

import (
	"path/filepath"
	"regexp"
	"strings"
)

func toAPIID(filename string) string {
	return strings.TrimSuffix(filename, filepath.Ext(filename))
}

func isValid(filename string) bool {
	regex, _ := regexp.Compile(`^[a-zA-Z0-9-]+\.json$`)
	return regex.MatchString(filename)
}

// FromID transforms an API ID into its filename
func FromID(apiID string) string {
	return strings.Join([]string{apiID, ".json"}, "")
}
