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

func mockAPIDirectoryReaderNoResults(directory string) ([]models.API, error) {
	return []models.API{}, nil
}

func mockAPIFileReader(path string) (models.API, error) {
	return models.API{}, nil
}

func mockAPIFileReaderWithError(path string) (models.API, error) {
	return models.API{}, errors.New("Unable to read file")
}

func TestList(t *testing.T) {
	testCases := []struct {
		directoryReader  func(directory string) ([]models.API, error)
		target           string
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
	}

	for _, tc := range testCases {
		apiResource := APIResource{
			zap.NewNop(),
			"",
			nil,
			tc.directoryReader,
		}

		req := httptest.NewRequest("GET", tc.target, nil)
		w := httptest.NewRecorder()

		apiResource.List(w, req)

		resp := w.Result()

		body, _ := ioutil.ReadAll(resp.Body)

		assert.Equal(t, tc.wantStatusCode, resp.StatusCode)
		assert.Equal(t, tc.wantContentType, resp.Header.Get("Content-Type"))
		assert.Equal(t, tc.wantResponseBody, string(body))
	}
}

func TestGet(t *testing.T) {
	testCases := []struct {
		apiID                       string
		rootDirectoryAPIDefinitions string
		wantStatusCode              int
		wantContentType             string
		wantResponseBody            string
		mockAPIFileReader           func(path string) (models.API, error)
	}{
		{
			"test-api-name",
			"./test-data/valid",
			200,
			"application/json",
			"{\"id\":\"\",\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\",\"tags\":null,\"badges\":null,\"contact\":{\"email\":\"\",\"phone\":\"\",\"fax\":\"\",\"chat\":\"\"}}\n",
			mockAPIFileReader,
		}, {
			"non-existing-api-id",
			"./test-data/valid",
			404,
			"text/plain; charset=utf-8",
			"404 page not found\n",
			mockAPIFileReader,
		}, {
			"invalid-json",
			"./test-data/invalid",
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
