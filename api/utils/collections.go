package utils

func Includes(collection []string, targetVal string) bool {
	for _, val := range collection {
		if val == targetVal {
			return true
		}
	}

	return false
}
