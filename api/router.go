package api

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
)

func router(logger *zap.Logger, gitlabConfig gitlab.Config) chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	r.Route("/api", func(r chi.Router) {
		r.Mount("/apis",
			resources.NewAPIResource(logger,
				"../data",
				datareaders.File,
				datareaders.Directory).Routes(),
		)
		r.Mount("/submit-api",
			resources.NewSubmitAPIResource(
				logger,
				gitlabConfig,
			).Routes(),
		)
		r.Mount("/tags",
			resources.NewTagResource(logger,
				"../data",
				datareaders.Directory).Routes(),
		)
	})

	return r
}
