package routes

import (
	"encoding/json"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
)

func ListAPIsHandler(logger *zap.Logger, apiFileReader func(directory string) []models.API) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		outputList := apiFileReader("../data")
		err := json.NewEncoder(w).Encode(outputList)

		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}
