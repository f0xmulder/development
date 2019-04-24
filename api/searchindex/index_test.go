package searchindex

import (
	"testing"

	"github.com/blevesearch/bleve/search"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

var dummyAPI = models.API{
	"dummy-api",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{"test-tag"},
	[]string{},
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
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{"test-tag"},
	[]string{},
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
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
	searchResult, _ := index.Search("id:another", map[string][]string{})

	assert.Equal(t, []models.API{anotherDummyAPI}, searchResult.APIs)
}

func TestSearchWorksForFilterByTag(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)
	searchResult, _ := index.Search("", map[string][]string{"tags": []string{"test-tag"}})
	assert.Equal(t, []models.API{anotherDummyAPI, dummyAPI}, searchResult.APIs)
}

func TestSearchDoesNotCrashForEmptyTagString(t *testing.T) {
	apis := []models.API{dummyAPI, anotherDummyAPI}
	index := NewIndex(&apis)
	searchResult, _ := index.Search("", map[string][]string{"tags": []string{""}})
	assert.Equal(t, []models.API{}, searchResult.APIs)
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
