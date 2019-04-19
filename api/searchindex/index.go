package searchindex

import (
	"log"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/analysis/analyzer/keyword"
	"github.com/blevesearch/bleve/analysis/lang/nl"
	"github.com/blevesearch/bleve/search"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

const facetCount = 50

// Index provides a friendlier API to Bleve
type Index struct {
	Bleve bleve.Index
	APIs  *[]models.API
}

// NewIndex will create a new Index that provides a friendlier API to Bleve
func NewIndex(apis *[]models.API) Index {
	textFieldMapping := bleve.NewTextFieldMapping()
	textFieldMapping.Analyzer = nl.AnalyzerName

	keywordFieldMapping := bleve.NewTextFieldMapping()
	keywordFieldMapping.Analyzer = keyword.Name

	apiMapping := bleve.NewDocumentMapping()
	apiMapping.AddFieldMappingsAt("organization_name", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("tags", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("badges", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("api_specification_type", keywordFieldMapping)

	indexMapping := bleve.NewIndexMapping()
	indexMapping.DefaultAnalyzer = "nl"
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
		Bleve: bleveIndex,
		APIs:  apis,
	}
}

// Search executes a search query in Bleve and maps the results to API models
func (index Index) Search(searchRequest *bleve.SearchRequest) (models.APIList, error) {
	applyFacetsToSearchRequest(searchRequest)
	searchResult, err := index.Bleve.Search(searchRequest)

	totalSearchRequest := bleve.NewSearchRequest(bleve.NewMatchAllQuery())
	applyFacetsToSearchRequest(totalSearchRequest)
	totalSearchResult, err := index.Bleve.Search(totalSearchRequest)

	if err != nil {
		return models.APIList{}, err
	}

	apiList := models.APIList{
		Total:  searchResult.Total,
		Facets: mergeFacets(searchResult.Facets, totalSearchResult.Facets),
		APIs:   mapBleveResultToAPIs(index.APIs, searchResult.Hits),
	}

	return apiList, err
}

func applyFacetsToSearchRequest(searchRequest *bleve.SearchRequest) {
	organizationFacet := bleve.NewFacetRequest("organization_name", facetCount)
	searchRequest.AddFacet("organization_name", organizationFacet)

	tagsFacet := bleve.NewFacetRequest("tags", facetCount)
	searchRequest.AddFacet("tags", tagsFacet)

	apiSpecTypeFacet := bleve.NewFacetRequest("api_specification_type", facetCount)
	searchRequest.AddFacet("api_specification_type", apiSpecTypeFacet)
}

func mergeFacets(resultFacets search.FacetResults, totalFacets search.FacetResults) search.FacetResults {
	for facetKey, facet := range totalFacets {
		facet.Total = resultFacets[facetKey].Total
		facet.Missing = resultFacets[facetKey].Missing
		facet.Other = resultFacets[facetKey].Other

		for _, term := range facet.Terms {
			term.Count = getTermCount(term.Term, resultFacets[facetKey].Terms)
		}
	}

	return totalFacets
}

func getTermCount(term string, termFacets search.TermFacets) int {
	for _, facet := range termFacets {
		if facet.Term == term {
			return facet.Count
		}
	}

	return 0
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
