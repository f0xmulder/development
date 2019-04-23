package utils

import (
	"fmt"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetQueryParam(t *testing.T) {
	testCases := []struct {
		url    string
		key    string
		values []string
	}{
		{
			"http://42.test/?test=&test2=a",
			"test",
			[]string{""},
		},
		{
			"http://42.test/?test=a",
			"test",
			[]string{"a"},
		},
		{
			"http://42.test/?test=a&test=b",
			"test",
			[]string{"a", "b"},
		},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.url), func(t *testing.T) {
			request, err := http.NewRequest("GET", tc.url, nil)

			assert.Nil(t, err)

			returnValues := GetQueryParam(request, tc.key)
			assert.Equal(t, tc.values, returnValues)
		})
	}
}
