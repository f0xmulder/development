package resources

import (
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"

	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"go.uber.org/zap"
)

func mockCreateIssue(config gitlab.Config, issue gitlab.PostIssue) (gitlab.GetIssue, error) {
	return gitlab.GetIssue{}, nil
}

func TestCreate(t *testing.T) {
	testCases := []struct {
		inputContent     string
		wantStatusCode   int
		wantContentType  string
		wantResponseBody string
	}{
		{
			"{\"id\":\"asdf\",\"description\":\"asdf\",\"organization_name\":\"asdf\",\"service_name\":\"asdf\",\"api_url\":\"asdf\",\"api_specification_type\":\"asdf\",\"specification_url\":\"asdf\",\"documentation_url\":\"asdf\", \"tags\":[], \"badges\":[]}\n",
			200,
			"application/json",
			"{\"id\":0,\"state\":\"\",\"title\":\"\",\"description\":\"\",\"created_at\":\"\",\"weight\":\"\",\"web_url\":\"\",\"labels\":null}\n",
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
			Logger:       zap.NewNop(),
			GitlabConfig: gitlab.Config{},
			CreateIssue:  mockCreateIssue,
		}

		t.Run(fmt.Sprintf("%s", url), func(t *testing.T) {
			fmt.Println(url)
			req := httptest.NewRequest("POST", url, strings.NewReader(tc.inputContent))
			w := httptest.NewRecorder()

			submitAPIResource.Post(w, req)

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
