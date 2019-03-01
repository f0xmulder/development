package resources

import (
	"context"
	"errors"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"
)

func mockAPIDirectoryReader(directory string) ([]models.API, error) {
	return []models.API{}, nil
}

func mockAPIFileReader(directory string, filename string) (models.API, error) {
	return models.API{}, nil
}

func mockAPIFileReaderWithError(directory string, filename string) (models.API, error) {
	return models.API{}, errors.New("Unable to read file")
}

func TestList(t *testing.T) {
	apiResource := APIResource{
		zap.NewNop(),
		"",
		nil,
		mockAPIDirectoryReader,
	}

	req := httptest.NewRequest("GET", "/list", nil)
	w := httptest.NewRecorder()

	apiResource.List(w, req)

	resp := w.Result()

	body, _ := ioutil.ReadAll(resp.Body)

	assert.Equal(t, 200, resp.StatusCode, "status code should be 200")
	assert.Equal(t, "application/json", resp.Header.Get("Content-Type"), "response type should be JSON")
	assert.Equal(t, "[]\n", string(body), "response body should be an empty array")
}

func TestGet(t *testing.T) {
	testCases := []struct {
		apiID                       string
		rootDirectoryAPIDefinitions string
		wantStatusCode              int
		wantContentType             string
		wantResponseBody            string
		mockAPIFileReader           func(directory string, filename string) (models.API, error)
	}{
		{
			"test-api-name",
			"./test-data-valid",
			200,
			"application/json",
			"{\"id\":\"\",\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\"}\n",
			mockAPIFileReader,
		}, {
			"non-existing-api-id",
			"./test-data-valid",
			404,
			"text/plain; charset=utf-8",
			"404 page not found\n",
			mockAPIFileReader,
		}, {
			"invalid-json",
			"./test-data-invalid",
			500,
			"text/plain; charset=utf-8",
			"oops, something went wrong while getting the API info\n",
			mockAPIFileReaderWithError,
		},
	}

	for _, tc := range testCases {
		url := strings.Join([]string{"/api/apis", tc.apiID}, "/")
		apiResource := APIResource{
			zap.NewNop(),
			tc.rootDirectoryAPIDefinitions,
			tc.mockAPIFileReader,
			nil,
		}

		t.Run(fmt.Sprintf("%s", url), func(t *testing.T) {
			fmt.Println(url)
			req := httptest.NewRequest("GET", url, nil)
			w := httptest.NewRecorder()

			ctx := chi.NewRouteContext()
			ctx.URLParams.Add("id", tc.apiID)

			req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

			apiResource.Get(w, req)
			resp := w.Result()
			body, _ := ioutil.ReadAll(resp.Body)

			if string(body) != tc.wantResponseBody {
				t.Errorf("got body %s, want %s", string(body), tc.wantResponseBody)
			}

			if resp.StatusCode != tc.wantStatusCode {
				t.Errorf("got status code %d, want %d", resp.StatusCode, tc.wantStatusCode)
			}

			if resp.Header.Get("Content-Type") != tc.wantContentType {
				t.Errorf("got content-type %s, want %s", resp.Header.Get("Content-Type"), tc.wantContentType)
			}
		})
	}
}
