package searchindex

import (
	"log"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/analysis/analyzer/keyword"
	"github.com/blevesearch/bleve/analysis/lang/nl"
	"github.com/blevesearch/bleve/search"
	"github.com/blevesearch/bleve/search/query"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

const facetCount = 50

// Index provides a friendlier API to Bleve
type Index struct {
	bleve bleve.Index
	apis  *[]models.API
}

// NewIndex will create a new Index that provides a friendlier API to Bleve
func NewIndex(apis *[]models.API) Index {
	textFieldMapping := bleve.NewTextFieldMapping()
	textFieldMapping.Analyzer = nl.AnalyzerName

	keywordFieldMapping := bleve.NewTextFieldMapping()
	keywordFieldMapping.Analyzer = keyword.Name

	apiMapping := bleve.NewDocumentMapping()
	for _, value := range []string{"organization_name", "tags", "api_specification_type"} {
		apiMapping.AddFieldMappingsAt(value, keywordFieldMapping)
	}

	indexMapping := bleve.NewIndexMapping()
	indexMapping.DefaultAnalyzer = nl.AnalyzerName
	indexMapping.DefaultMapping = apiMapping

	bleveIndex, err := bleve.NewMemOnly(indexMapping)
	if err != nil {
		log.Fatal(err)
		return Index{}
	}

	for _, apiModel := range *apis {
		addToIndexErr := bleveIndex.Index(apiModel.ID, apiModel)

		if addToIndexErr != nil {
			log.Fatal(addToIndexErr)
		}
	}

	return Index{
		bleve: bleveIndex,
		apis:  apis,
	}
}

// Search executes a search query in Bleve and maps the results to API models
func (index Index) Search(q string, filters map[string][]string) (models.APIList, error) {
	query := newQuery(q, filters)
	searchRequest := newSearchRequest(query)
	searchResult, err := index.bleve.Search(searchRequest)
	if err != nil {
		return models.APIList{}, err
	}

	apis := mapBleveResultToAPIs(index.apis, searchResult.Hits)

	// execute a MatchAllQuery to determine the facets on the full result set
	query = bleve.NewMatchAllQuery()
	facetSearchRequest := newSearchRequest(query)
	facetSearchResult, err := index.bleve.Search(facetSearchRequest)
	if err != nil {
		return models.APIList{}, err
	}

	facets := facetSearchResult.Facets

	// apply total counts of original facets
	for key, facet := range searchResult.Facets {
		counts := map[string]int{}
		for _, term := range facet.Terms {
			counts[term.Term] = term.Count
		}
		for _, term := range facets[key].Terms {
			newCount, ok := counts[term.Term]
			if ok {
				term.Count = newCount
			} else {
				term.Count = 0
			}
		}
	}

	// now execute a separate query for all filters that are currently active
	// because we would like users to be able to select more values
	for key := range filters {
		currentFilters := map[string][]string{}
		for currentKey := range filters {
			if currentKey == key {
				continue
			}

			currentFilters[currentKey] = filters[currentKey]
		}

		query := newQuery(q, currentFilters)
		searchRequest := newSearchRequest(query)
		searchResult, err := index.bleve.Search(searchRequest)
		if err != nil {
			return models.APIList{}, err
		}

		counts := map[string]int{}
		for _, term := range searchResult.Facets[key].Terms {
			counts[term.Term] = term.Count
		}
		for _, term := range facets[key].Terms {
			newCount, ok := counts[term.Term]
			if ok {
				term.Count = newCount
			} else {
				term.Count = 0
			}
		}
	}

	apiList := models.APIList{
		Total:  searchResult.Total,
		Facets: facets,
		APIs:   apis,
	}

	return apiList, err
}

func newQuery(q string, filters map[string][]string) query.Query {
	query := bleve.NewConjunctionQuery()

	if q != "" {
		query.AddQuery(bleve.NewQueryStringQuery(q))
	} else {
		query.AddQuery(bleve.NewMatchAllQuery())
	}

	for key, values := range filters {
		if len(values) == 0 {
			continue
		}

		subQuery := bleve.NewDisjunctionQuery()
		for _, value := range values {
			subQuery.AddQuery(bleve.NewPhraseQuery([]string{value}, key))
		}

		query.AddQuery(subQuery)
	}

	return query
}

func newSearchRequest(q query.Query) *bleve.SearchRequest {
	searchRequest := bleve.NewSearchRequest(q)

	for _, value := range []string{"organization_name", "tags", "api_specification_type"} {
		facet := bleve.NewFacetRequest(value, facetCount)
		searchRequest.AddFacet(value, facet)
	}

	return searchRequest
}

func mapBleveResultToAPIs(items *[]models.API, matchCollection search.DocumentMatchCollection) []models.API {
	hash := make(map[string]models.API)

	for _, API := range *items {
		hash[API.ID] = API
	}

	returnArray := []models.API{}
	for _, document := range matchCollection {
		returnArray = append(returnArray, hash[document.ID])
	}

	return returnArray
}
