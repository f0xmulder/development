package resources

import (
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"

	"go.uber.org/zap"
)

func TestCreate(t *testing.T) {
	testCases := []struct {
		inputContent     string
		wantStatusCode   int
		wantContentType  string
		wantResponseBody string
	}{
		{
			"{\"id\":\"\",\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\"}\n",
			200,
			"application/json",
			"",
		},
		{
			"asdf{\"id\":\"\",\"description\":\"\",\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\"}\n",
			400,
			"text/plain; charset=utf-8",
			"bad request\n",
		},
	}

	for _, tc := range testCases {
		url := "/api/submit-api/"

		submitAPIResource := SubmitAPIResource{
			zap.NewNop(),
			"",
		}

		t.Run(fmt.Sprintf("%s", url), func(t *testing.T) {
			fmt.Println(url)
			req := httptest.NewRequest("POST", url, strings.NewReader(tc.inputContent))
			w := httptest.NewRecorder()

			submitAPIResource.Create(w, req)

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
