package scores

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

func mockTestServer() *httptest.Server {
	testServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	return testServer
}

func TestCalculateScores(t *testing.T) {
	actualScores := CalculateScores(models.API{})
	expectedScores := models.APIScores{}

	assert.Equal(t, actualScores, expectedScores)
}

func TestHasDocumentation(t *testing.T) {
	testAPI := models.API{}
	assert.Equal(t, hasDocumentation(testAPI), false)

	testAPI = models.API{DocumentationURL: "https://www.example.com"}
	assert.Equal(t, hasDocumentation(testAPI), true)
}

func TestHasSpecification(t *testing.T) {
	testAPI := models.API{}
	assert.Equal(t, hasSpecification(testAPI), false)

	testAPI = models.API{SpecificationURL: "https://www.example.com"}
	assert.Equal(t, hasSpecification(testAPI), true)
}

func TestHasContactDetails(t *testing.T) {
	testAPI := models.API{}
	assert.Equal(t, hasContactDetails(testAPI), false)

	testAPI = models.API{Contact: models.APIContactDetails{URL: "https://www.example.com"}}
	assert.Equal(t, hasContactDetails(testAPI), true)
}

func TestProvidesSLA(t *testing.T) {
	testAPI := models.API{}
	assert.Equal(t, providesSLA(testAPI), false)

	testAPI = models.API{TermsOfUse: models.APITermsOfUse{
		SupportResponseTime: "2 business hours",
		UptimeGuarantee:     0.90,
	}}

	assert.Equal(t, providesSLA(testAPI), true)
}

func TestIsOnline(t *testing.T) {
	testServer := mockTestServer()

	testAPI := models.API{}

	assert.Equal(t, isOnline(testAPI), false)

	testAPI = models.API{
		APIURL: testServer.URL,
	}

	assert.Equal(t, isOnline(testAPI), true)
}
