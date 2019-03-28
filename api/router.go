package api

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
)

// NewAPIResource creates a new APIResource
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

// NewTagResource creates a new TagResource
func NewTagResource(logger *zap.Logger, rootDirectoryAPIDefinitions string, readDirectory func(directory string) ([]models.API, error)) *resources.TagResource {
	i := &resources.TagResource{
		Logger:                      logger,
		RootDirectoryAPIDefinitions: rootDirectoryAPIDefinitions,
		ReadDirectory:               readDirectory,
	}

	return i
}

// NewSubmitAPIResource creates a new SubmitAPIResource
func NewSubmitAPIResource(logger *zap.Logger, gitlabConfig gitlab.Config) *resources.SubmitAPIResource {
	i := &resources.SubmitAPIResource{
		Logger:       logger,
		GitLabConfig: gitlabConfig,
		CreateIssue:  gitlab.CreateIssue,
	}

	return i
}

func router(logger *zap.Logger, gitlabConfig gitlab.Config) chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	r.Route("/api", func(r chi.Router) {
		r.Mount("/apis",
			NewAPIResource(logger,
				"../data",
				datareaders.File,
				datareaders.Directory).Routes(),
		)
		r.Mount("/submit-api",
			NewSubmitAPIResource(
				logger,
				gitlabConfig,
			).Routes(),
		)
		r.Mount("/tags",
			NewTagResource(logger,
				"../data",
				datareaders.Directory).Routes(),
		)
	})

	return r
}
