package searchindex

import (
	"testing"

	"github.com/blevesearch/bleve/search"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/scores"
)

var dummyAPI = models.API{
	"dummy-api",
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
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
}

var anotherDummyAPI = models.API{
	"another-dummy-api",
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
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
}

func init() {
	dummyAPIScores := scores.CalculateScores(dummyAPI)
	dummyAPI.Scores = &dummyAPIScores

	anotherDummyAPIScores := scores.CalculateScores(anotherDummyAPI)
	anotherDummyAPI.Scores = &anotherDummyAPIScores
}

func TestNewIndex(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)

	assert.Equal(t, apis, *index.apis)

	docCount, err := index.bleve.DocCount()
	if err != nil {
		t.Error(err)
	}

	assert.Equal(t, docCount, uint64(2))
}

func TestSearchWorksForStringQueryByID(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)
	searchResult, _ := index.Search("id:another", map[string][]string{}, 1, 10)

	assert.Equal(t, []models.API{anotherDummyAPI}, searchResult.APIs)
}

func TestSearchWorksForFilterByTag(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)
	searchResult, _ := index.Search("", map[string][]string{"tags": []string{"test-tag"}}, 1, 10)
	assert.Equal(t, []models.API{anotherDummyAPI, dummyAPI}, searchResult.APIs)
}

func TestSearchDoesNotCrashForEmptyTagString(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)
	searchResult, _ := index.Search("", map[string][]string{"tags": []string{""}}, 1, 10)
	assert.Equal(t, []models.API{}, searchResult.APIs)
}

func TestSearchPagination(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)

	searchResultFirstPage, _ := index.Search("", map[string][]string{}, 1, 1)
	assert.Equal(t, []models.API{anotherDummyAPI}, searchResultFirstPage.APIs)

	searchResultSecondPage, _ := index.Search("", map[string][]string{}, 2, 1)
	assert.Equal(t, []models.API{dummyAPI}, searchResultSecondPage.APIs)
}

func TestMapBleveResultToAPIs(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}

	testCases := []struct {
		matchCollection search.DocumentMatchCollection
		expected        []models.API
	}{
		{
			search.DocumentMatchCollection{
				&search.DocumentMatch{ID: "dummy-api", Score: 1},
			},
			[]models.API{dummyAPI},
		},
		{
			search.DocumentMatchCollection{},
			[]models.API{},
		},
		{
			search.DocumentMatchCollection{
				&search.DocumentMatch{ID: "dummy-api", Score: 1},
				&search.DocumentMatch{ID: "another-dummy-api", Score: 1},
			},
			[]models.API{dummyAPI, anotherDummyAPI},
		},
	}

	for _, tc := range testCases {
		actual := mapBleveResultToAPIs(&apis, tc.matchCollection)
		assert.Equal(t, tc.expected, actual)
	}
}
