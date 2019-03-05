package resources

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func mockAPIDirectoryReaderDuplicateAPIResult(directory string) ([]models.API, error) {
	return []models.API{
		dummyAPI,
		dummyAPI,
	}, nil
}

func TestTagList(t *testing.T) {
	testCases := []struct {
		directoryReader  func(directory string) ([]models.API, error)
		url              string
		wantStatusCode   int
		wantContentType  string
		wantResponseBody string
	}{
		{
			mockAPIDirectoryReaderNoResults,
			"/list",
			200,
			"application/json",
			"[]\n",
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list",
			200,
			"application/json",
			"[\"test-tag\"]\n",
		},
		{
			mockAPIDirectoryReaderDuplicateAPIResult,
			"/list",
			200,
			"application/json",
			"[\"test-tag\"]\n",
		},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.url), func(t *testing.T) {
			tagResource := TagResource{
				zap.NewNop(),
				"",
				tc.directoryReader,
			}

			req := httptest.NewRequest("GET", tc.url, nil)
			w := httptest.NewRecorder()

			tagResource.List(w, req)

			resp := w.Result()

			body, _ := ioutil.ReadAll(resp.Body)

			assert.Equal(t, tc.wantStatusCode, resp.StatusCode)
			assert.Equal(t, tc.wantContentType, resp.Header.Get("Content-Type"))
			assert.Equal(t, tc.wantResponseBody, string(body))
		})
	}
}
