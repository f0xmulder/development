package utils

import "net/http"

// GetQueryParam extracts the query parameters for a specific key and returns an array of values
func GetQueryParam(r *http.Request, key string) []string {
	values, ok := r.URL.Query()[key]

	if ok {
		return values
	}

	return []string{}
}
