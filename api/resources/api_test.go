package resources

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/go-chi/chi"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
)

var dummyAPI = models.API{
	"test-api-name",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{"test-tag"},
	[]string{},
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
}

var dummyImplementationOfReferenceAPI = models.API{
	"test-implementation-of-reference-api",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{},
	[]string{},
	models.APIContactDetails{},
	false,
	map[string][]string{
		"test-reference-api": {RELATION_TYPE_REFERENCE_IMPLEMENTATION},
	},
	models.APITermsOfUse{},
	nil,
}

func mockAPIDirectoryReaderNoResults(directory string) ([]models.API, error) {
	return []models.API{}, nil
}

func mockAPIDirectoryReaderOneResult(directory string) ([]models.API, error) {
	return []models.API{
		dummyAPI,
	}, nil
}

func mockAPIFileReader(path string) (models.API, error) {
	return models.API{}, nil
}

func mockAPIFileReaderWithError(path string) (models.API, error) {
	return models.API{}, errors.New("Unable to read file")
}

func TestFilterAPIsByTag(t *testing.T) {
	testCases := []struct {
		query    string
		list     []models.API
		expected []models.API
	}{
		{"test-tag", []models.API{dummyAPI}, []models.API{dummyAPI}},
		{"a", []models.API{dummyAPI}, []models.API{}},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.query), func(t *testing.T) {
			assert.Equal(t, tc.expected, filterAPIsByTag(tc.query, tc.list))
		})
	}
}

func TestAPIList(t *testing.T) {
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
			"/list?tags=test-tag",
			200,
			"application/json",
			"[{\"id\":\"test-api-name\",\"description\":\"Test Description\",\"organization_name\":\"Test Organization Name\",\"service_name\":\"Test Service Name\",\"api_url\":\"Test API URL\",\"api_specification_type\":\"Test Specification Type\",\"specification_url\":\"Test Specification URL\",\"documentation_url\":\"Test Documentation URL\",\"tags\":[\"test-tag\"],\"badges\":[],\"contact\":{\"email\":\"\",\"phone\":\"\",\"fax\":\"\",\"chat\":\"\",\"url\":\"\"},\"is_reference_implementation\":false,\"terms_of_use\":{\"government_only\":false,\"pay_per_use\":false,\"uptime_guarantee\":0,\"support_response_time\":\"\"}}]\n",
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list?tags=tag-which-does-not-appear-for-any-result",
			200,
			"application/json",
			"[]\n",
		},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.url), func(t *testing.T) {
			apiResource := APIResource{
				zap.NewNop(),
				"",
				nil,
				tc.directoryReader,
			}

			req := httptest.NewRequest("GET", tc.url, nil)
			w := httptest.NewRecorder()

			apiResource.List(w, req)

			resp := w.Result()

			body, _ := ioutil.ReadAll(resp.Body)

			assert.Equal(t, tc.wantStatusCode, resp.StatusCode)
			assert.Equal(t, tc.wantContentType, resp.Header.Get("Content-Type"))
			assert.Equal(t, tc.wantResponseBody, string(body))
		})
	}
}

func TestAPIGet(t *testing.T) {
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
			"{\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\",\"tags\":null,\"badges\":null,\"contact\":{\"email\":\"\",\"phone\":\"\",\"fax\":\"\",\"chat\":\"\",\"url\":\"\"},\"is_reference_implementation\":false,\"terms_of_use\":{\"government_only\":false,\"pay_per_use\":false,\"uptime_guarantee\":0,\"support_response_time\":\"\"},\"scores\":{\"has_documentation\":false,\"has_specification\":false,\"has_contact_details\":false,\"provides_sla\":false}}\n",
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

func TestAPIImplementedBy(t *testing.T) {
	testCases := []struct {
		apiID                       string
		rootDirectoryAPIDefinitions string
		wantStatusCode              int
		wantContentType             string
		wantResponseBody            string
		mockAPIDirectoryReader      func(path string) ([]models.API, error)
	}{
		{
			"test-api-name",
			"./test-data/valid",
			200,
			"application/json",
			"[]\n",
			func(directory string) ([]models.API, error) {
				return []models.API{
					dummyAPI,
				}, nil
			},
		},
		{
			"test-reference-api",
			"./test-data/valid",
			200,
			"application/json",
			"[{\"id\":\"test-implementation-of-reference-api\",\"description\":\"Test Description\",\"organization_name\":\"Test Organization Name\",\"service_name\":\"Test Service Name\",\"api_url\":\"Test API URL\",\"api_specification_type\":\"Test Specification Type\",\"specification_url\":\"Test Specification URL\",\"documentation_url\":\"Test Documentation URL\",\"tags\":[],\"badges\":[],\"contact\":{\"email\":\"\",\"phone\":\"\",\"fax\":\"\",\"chat\":\"\",\"url\":\"\"},\"is_reference_implementation\":false,\"relations\":{\"test-reference-api\":[\"reference-implementation\"]},\"terms_of_use\":{\"government_only\":false,\"pay_per_use\":false,\"uptime_guarantee\":0,\"support_response_time\":\"\"}}]\n",
			func(directory string) ([]models.API, error) {
				return []models.API{
					dummyImplementationOfReferenceAPI,
				}, nil
			},
		},
	}

	for _, tc := range testCases {
		url := strings.Join([]string{"/api/apis", tc.apiID, "implemented-by"}, "/")
		apiResource := APIResource{
			zap.NewNop(),
			tc.rootDirectoryAPIDefinitions,
			nil,
			tc.mockAPIDirectoryReader,
		}

		t.Run(fmt.Sprintf("%s", url), func(t *testing.T) {
			req := httptest.NewRequest("GET", url, nil)
			w := httptest.NewRecorder()

			ctx := chi.NewRouteContext()
			ctx.URLParams.Add("id", tc.apiID)

			req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

			apiResource.ListImplementedBy(w, req)
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
