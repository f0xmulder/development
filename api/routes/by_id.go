package routes

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
	"strings"
)

func apiIdToPath(apiId string) string {
	filename := strings.Join([]string{apiId, ".json"}, "")
	return strings.Join([]string{"..", "data", filename}, "/")
}

// APIByIdHandler show API details by id
func APIByIdHandler(logger *zap.Logger, apiFileReader func(filename string) models.API) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		apiId := chi.URLParam(r, "id")
		path := apiIdToPath(apiId)

		output := apiFileReader(path)
		err := json.NewEncoder(w).Encode(output)

		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}
