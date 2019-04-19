package searchindex

import (
	"testing"

	"github.com/blevesearch/bleve"
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

var apis = []models.API{dummyAPI, anotherDummyAPI}

func TestNewIndex(t *testing.T) {
	index := NewIndex(&apis)

	assert.Equal(t, apis, *index.APIs)

	docCount, err := index.Bleve.DocCount()
	if err != nil {
		t.Error(err)
	}

	assert.Equal(t, docCount, uint64(len(apis)))
}

func TestSearch(t *testing.T) {
	index := NewIndex(&apis)

	searchRequest := bleve.NewSearchRequest(bleve.NewQueryStringQuery("another"))
	searchResult, _ := index.Search(searchRequest, []string{})

	assert.Equal(t, []models.API{anotherDummyAPI}, searchResult.APIs)
}

func TestMergeFacets(t *testing.T) {
	facetResult := search.FacetResult{
		Total:   5,
		Missing: 1,
		Other:   1,
		Terms: search.TermFacets{
			&search.TermFacet{Term: "41", Count: 2},
			&search.TermFacet{Term: "42", Count: 5},
			&search.TermFacet{Term: "43", Count: 7},
		},
	}

	anotherFacetResult := search.FacetResult{
		Total:   2,
		Missing: 0,
		Other:   1,
		Terms: search.TermFacets{
			&search.TermFacet{Term: "41", Count: 1},
			&search.TermFacet{Term: "42", Count: 8},
			&search.TermFacet{Term: "43", Count: 6},
		},
	}

	facetResults := search.FacetResults{"result": &facetResult}
	anotherFacetResults := search.FacetResults{"result": &anotherFacetResult}

	facetResults = mergeFacets(facetResults, anotherFacetResults, []string{})

	assert.Equal(t, facetResults, anotherFacetResults)
}

func TestGetTermCount(t *testing.T) {
	termFacets := search.TermFacets{
		&search.TermFacet{Term: "41", Count: 1},
		&search.TermFacet{Term: "42", Count: 8},
		&search.TermFacet{Term: "43", Count: 6},
	}

	result := getTermCount("42", termFacets)
	assert.Equal(t, 8, result)
}
