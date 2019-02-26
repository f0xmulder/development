package routes

import (
	"encoding/json"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
)

// ListAPIsHandler lists the available APIs
func ListAPIsHandler(logger *zap.Logger, apiFileReader func(directory string) ([]models.API, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		outputList, errReadFile := apiFileReader("../data")
		err := json.NewEncoder(w).Encode(outputList)

		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}

		if errReadFile != nil {
			logger.Error("oops, something went wrong while getting the info of an API", zap.Error(errReadFile))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}
