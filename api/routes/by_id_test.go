package routes

import (
	"context"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestApiIdToFilename(t *testing.T) {
	expected := "abc-def.json"
	actual := apiIDToFilename("abc-def")
	assert.Equal(t, expected, actual)
}

func mockAPIFileReader(directory string, filename string) (models.API, error) {
	return models.API{}, nil
}

func mockAPIFileReaderWithError(directory string, filename string) (models.API, error) {
	return models.API{}, errors.New("Unable to read file")
}

func TestAPIByIdHandler(t *testing.T) {
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
			"../test-data-valid",
			200,
			"application/json",
			"{\"id\":\"\",\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\"}\n",
			mockAPIFileReader,
		}, {
			"non-existing-api-id",
			"../test-data-valid",
			404,
			"text/plain; charset=utf-8",
			"can not find API\n",
			mockAPIFileReader,
		}, {
			"invalid-json",
			"../test-data-invalid",
			500,
			"text/plain; charset=utf-8",
			"oops, something went wrong while getting the API info\n",
			mockAPIFileReaderWithError,
		},
	}

	for _, tc := range testCases {
		url := strings.Join([]string{"/api/apis", tc.apiID}, "/")

		t.Run(fmt.Sprintf("%s", url), func(t *testing.T) {
			logger := zap.NewNop()

			fmt.Println(url)
			req := httptest.NewRequest("GET", url, nil)
			w := httptest.NewRecorder()

			ctx := chi.NewRouteContext()
			ctx.URLParams.Add("id", tc.apiID)

			req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

			APIByIDHandler(logger, tc.rootDirectoryAPIDefinitions, tc.mockAPIFileReader)(w, req)
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
