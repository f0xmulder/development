package scores

import (
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// CalculateScores calculates the scores and returns them in a APIScores struct
func CalculateScores(api models.API) models.APIScores {
	return models.APIScores{
		HasDocumentation:  hasDocumentation(api),
		HasSpecification:  hasSpecification(api),
		HasContactDetails: hasContactDetails(api),
		ProvidesSLA:       providesSLA(api),
	}
}

func hasDocumentation(api models.API) bool {
	production, err := api.GetProductionEnvironment()

	return (err == nil && production.DocumentationURL != "")
}

func hasSpecification(api models.API) bool {
	production, err := api.GetProductionEnvironment()

	return (err == nil && production.SpecificationURL != "")
}

func hasContactDetails(api models.API) bool {
	return (api.Contact.Chat != "" ||
		api.Contact.Email != "" ||
		api.Contact.Fax != "" ||
		api.Contact.Phone != "" ||
		api.Contact.URL != "")
}

func providesSLA(api models.API) bool {
	return (api.TermsOfUse.SupportResponseTime != "" && api.TermsOfUse.UptimeGuarantee >= 0.9)
}
