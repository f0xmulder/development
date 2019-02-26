package routes

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func mockAPIDirectoryReader(path string) []models.API {
	return []models.API{}
}

func TestListAPIsHandler(t *testing.T) {
	logger := zap.NewNop()

	req := httptest.NewRequest("GET", "/list", nil)
	w := httptest.NewRecorder()

	ListAPIsHandler(logger, mockAPIDirectoryReader)(w, req)

	resp := w.Result()

	body, _ := ioutil.ReadAll(resp.Body)

	assert.Equal(t, 200, resp.StatusCode, "status code should be 200")
	assert.Equal(t, "application/json", resp.Header.Get("Content-Type"), "response type should be JSON")
	assert.Equal(t, "[]\n", string(body), "response body should be an empty array")
}
