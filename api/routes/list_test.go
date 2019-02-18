package routes

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func mockGetAvailableAPIs() []models.API {
	return []models.API{}
}

func TestListAPIsHandler(t *testing.T) {
	logger := zap.NewNop()

	req := httptest.NewRequest("GET", "/list", nil)
	w := httptest.NewRecorder()

	ListAPIsHandler(logger, mockGetAvailableAPIs)(w, req)

	resp := w.Result()

	body, _ := ioutil.ReadAll(resp.Body)

	assert.Equal(t, 200, resp.StatusCode)
	assert.Equal(t, "application/json", resp.Header.Get("Content-Type"))
	assert.Equal(t, "[]\n", string(body))
}
