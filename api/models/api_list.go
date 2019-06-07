package models

import "github.com/blevesearch/bleve/search"

// APIList contains a list of API's with their filterable facets and total count
type APIList struct {
	Total       uint64              `json:"total"`
	Page        int                 `json:"page"`
	RowsPerPage int                 `json:"rowsPerPage"`
	Facets      search.FacetResults `json:"facets"`
	APIs        []API               `json:"apis"`
}
