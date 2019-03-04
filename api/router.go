package api

import (
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/data-readers"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
)

func NewAPIResource(logger *zap.Logger, rootDirectoryAPIDefinitions string, readFile func(path string) (models.API, error),
	readDirectory func(directory string) ([]models.API, error)) *resources.APIResource {
	i := &resources.APIResource{
		Logger:                      logger,
		RootDirectoryAPIDefinitions: rootDirectoryAPIDefinitions,
		ReadFile:                    readFile,
		ReadDirectory:               readDirectory,
	}
	return i
}

func router(logger *zap.Logger) chi.Router {
	r := chi.NewRouter()
	r.Mount("/api/apis",
		NewAPIResource(logger,
			"../data",
			data_readers.File,
			data_readers.Directory).Routes(),
	)
	return r
}
