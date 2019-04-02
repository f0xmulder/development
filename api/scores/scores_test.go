package scores

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

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
