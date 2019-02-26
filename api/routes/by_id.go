package routes

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
)

// APIByIDHandler show API details by id
func APIByIDHandler(logger *zap.Logger, apiFileReader func(directory string, filename string) models.API) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		apiID := chi.URLParam(r, "id")

		output := apiFileReader("../data", apiID)
		err := json.NewEncoder(w).Encode(output)

		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}
