package utils

import "net/http"

// GetQueryParams extracts the query parameters for a specific key and returns an array of values
func GetQueryParams(r *http.Request, key string) []string {
	values, ok := r.URL.Query()[key]

	if ok {
		return values
	}

	return []string{}
}
