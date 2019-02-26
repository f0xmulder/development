package routes

import (
	"context"
	"github.com/go-chi/chi"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func mockAPIFileReader(path string) models.API {
	return models.API{}
}

func TestApiToPath(t *testing.T) {
	actual := apiIdToPath("api-file-id")
	expected := "../data/api-file-id.json"
	assert.Equal(t, expected, actual)
}

func TestAPIByIdHandler(t *testing.T) {
	logger := zap.NewNop()

	req := httptest.NewRequest("GET", "/list/test-api-name", nil)
	w := httptest.NewRecorder()

	ctx := chi.NewRouteContext()
	ctx.URLParams.Add("id", "my-api-id")

	req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

	APIByIdHandler(logger, mockAPIFileReader)(w, req)

	resp := w.Result()

	body, _ := ioutil.ReadAll(resp.Body)

	assert.Equal(t, 200, resp.StatusCode, "status code should be 200")
	assert.Equal(t, "application/json", resp.Header.Get("Content-Type"), "response type should be JSON")
	assert.Equal(t, "{\"organization_name\":\"\",\"service_name\":\"\",\"api_url\":\"\",\"api_specification_type\":\"\",\"specification_url\":\"\",\"documentation_url\":\"\"}\n", string(body), "response body should contain an API")
}
