package datareaders

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestIsValid(t *testing.T) {
	testCases := []struct {
		filename string
		valid    bool
	}{
		{"foobar.json", true},
		{"foo-bar.json", true},
		{"foo/bar.json", false},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.filename), func(t *testing.T) {
			assert.Equal(t, tc.valid, isValid(tc.filename))
		})
	}
}

func TestToAPIID(t *testing.T) {
	expected := "test-filename"
	actual := toAPIID("test-filename.json")
	assert.Equal(t, expected, actual)
}

func TestFromID(t *testing.T) {
	expected := "abc-def.json"
	actual := FromID("abc-def")
	assert.Equal(t, expected, actual)
}
