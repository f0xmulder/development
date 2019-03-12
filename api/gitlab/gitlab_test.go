package gitlab

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func mockTestServer() *httptest.Server {
	getIssue := Issue{
		ID:          42,
		Title:       "Test",
		Description: "Test",
		WebURL:      "https://test/issues/42",
	}

	testServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(&getIssue)
	}))

	return testServer
}

func TestCreateIssue(t *testing.T) {
	testServer := mockTestServer()

	config := Config{
		URL:         testServer.URL,
		AccessToken: "12345",
		ProjectID:   "42",
	}

	createIssueBody := CreateIssueBody{
		Title:       "test",
		Description: "test",
		Labels:      "test",
	}

	issue, err := CreateIssue(config, createIssueBody)
	if err != nil {
		log.Fatal(err)
	}

	assert.Equal(t, issue.WebURL, "https://test/issues/42", "did not receive expected web_url")
}
