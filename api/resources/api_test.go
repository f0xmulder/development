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
	"REST/JSON",
	[]models.Tag{"test-tag"},
	[]string{},
	[]models.APIEnvironment{
		{
			Name:             models.ProductionEnvironment,
			APIURL:           "Test API URL",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
		},
	},
	nil,
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
}

var dummyImplementationOfReferenceAPI = models.API{
	"test-implementation-of-reference-api",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"REST/JSON",
	[]models.Tag{},
	[]string{},
	[]models.APIEnvironment{
		{
			Name:             models.ProductionEnvironment,
			APIURL:           "Test API URL",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
		},
	},
	nil,
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
			`{"total":0,"page":1,"rowsPerPage":10,"facets":{"api_type":{"field":"api_type","total":0,"missing":0,"other":0},"organization_name":{"field":"organization_name","total":0,"missing":0,"other":0},"tags":{"field":"tags","total":0,"missing":0,"other":0}},"apis":[]}
`,
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list?tags=test-tag",
			200,
			"application/json",
			`{"total":1,"page":1,"rowsPerPage":10,"facets":{"api_type":{"field":"api_type","total":1,"missing":0,"other":0,"terms":[{"term":"REST/JSON","count":1}]},"organization_name":{"field":"organization_name","total":1,"missing":0,"other":0,"terms":[{"term":"Test Organization Name","count":1}]},"tags":{"field":"tags","total":1,"missing":0,"other":0,"terms":[{"term":"test-tag","count":1}]}},"apis":[{"id":"test-api-name","description":"Test Description","organization_name":"Test Organization Name","service_name":"Test Service Name","api_type":"REST/JSON","tags":["test-tag"],"badges":[],"environments":[{"name":"Productie","api_url":"Test API URL","specification_url":"Test Specification URL","documentation_url":"Test Documentation URL"}],"contact":{"email":"","phone":"","fax":"","chat":"","url":""},"is_reference_implementation":false,"terms_of_use":{"government_only":false,"pay_per_use":false,"uptime_guarantee":0,"support_response_time":""},"scores":{"has_documentation":true,"has_specification":true,"has_contact_details":false,"provides_sla":false}}]}
`,
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list?tags=tag-which-does-not-appear-for-any-result",
			200,
			"application/json",
			`{"total":0,"page":1,"rowsPerPage":10,"facets":{"api_type":{"field":"api_type","total":1,"missing":0,"other":0,"terms":[{"term":"REST/JSON","count":0}]},"organization_name":{"field":"organization_name","total":1,"missing":0,"other":0,"terms":[{"term":"Test Organization Name","count":0}]},"tags":{"field":"tags","total":1,"missing":0,"other":0,"terms":[{"term":"test-tag","count":1}]}},"apis":[]}
`,
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list?tags=test-tag&page=0",
			422,
			"text/plain; charset=utf-8",
			"invalid page specified, should be a natural number greater than zero\n",
		},
		{
			mockAPIDirectoryReaderOneResult,
			"/list?tags=test-tag&page=-42",
			422,
			"text/plain; charset=utf-8",
			"invalid page specified, should be a natural number greater than zero\n",
		},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("%s", tc.url), func(t *testing.T) {
			apiResource := NewAPIResource(
				zap.NewNop(),
				"",
				nil,
				tc.directoryReader,
			)

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
		apiID             string
		rootDirectory     string
		wantStatusCode    int
		wantContentType   string
		wantResponseBody  string
		mockAPIFileReader func(path string) (models.API, error)
	}{
		{
			"test-api-name",
			"./test-data/valid",
			200,
			"application/json",
			`{"description":"","organization_name":"","service_name":"","api_type":"","tags":null,"badges":null,"environments":null,"contact":{"email":"","phone":"","fax":"","chat":"","url":""},"is_reference_implementation":false,"terms_of_use":{"government_only":false,"pay_per_use":false,"uptime_guarantee":0,"support_response_time":""},"scores":{"has_documentation":false,"has_specification":false,"has_contact_details":false,"provides_sla":false}}
`,
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
		apiResource := NewAPIResource(
			zap.NewNop(),
			tc.rootDirectory,
			tc.mockAPIFileReader,
			mockAPIDirectoryReaderNoResults,
		)

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
			`[{"id":"test-implementation-of-reference-api","description":"Test Description","organization_name":"Test Organization Name","service_name":"Test Service Name","api_type":"REST/JSON","tags":[],"badges":[],"environments":[{"name":"Productie","api_url":"Test API URL","specification_url":"Test Specification URL","documentation_url":"Test Documentation URL"}],"contact":{"email":"","phone":"","fax":"","chat":"","url":""},"is_reference_implementation":false,"relations":{"test-reference-api":["reference-implementation"]},"terms_of_use":{"government_only":false,"pay_per_use":false,"uptime_guarantee":0,"support_response_time":""}}]
`,
			func(directory string) ([]models.API, error) {
				return []models.API{
					dummyImplementationOfReferenceAPI,
				}, nil
			},
		},
	}

	for _, tc := range testCases {
		url := strings.Join([]string{"/api/apis", tc.apiID, "implemented-by"}, "/")
		apiResource := NewAPIResource(
			zap.NewNop(),
			"",
			nil,
			tc.mockAPIDirectoryReader,
		)

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
