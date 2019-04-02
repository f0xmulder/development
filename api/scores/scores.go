package scores

import (
	"log"
	"net/http"
	"time"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// CalculateScores calculates the scores and returns them in a APIScores struct
func CalculateScores(api models.API) models.APIScores {
	return models.APIScores{
		HasDocumentation:  hasDocumentation(api),
		HasSpecification:  hasSpecification(api),
		HasContactDetails: hasContactDetails(api),
		ProvidesSLA:       providesSLA(api),
		IsOnline:          isOnline(api),
	}
}

func hasDocumentation(api models.API) bool {
	return (api.DocumentationURL != "")
}

func hasSpecification(api models.API) bool {
	return (api.SpecificationURL != "")
}

func hasContactDetails(api models.API) bool {
	return (api.Contact.Chat != "" ||
		api.Contact.Email != "" ||
		api.Contact.Fax != "" ||
		api.Contact.Phone != "" ||
		api.Contact.URL != "")
}

func providesSLA(api models.API) bool {
	return (api.TermsOfUse.SupportResponseTime != "" && api.TermsOfUse.UptimeGuarantee > 0.9)
}

func isOnline(api models.API) bool {
	if api.APIURL == "" {
		return false
	}

	timeout := time.Duration(2 * time.Second)
	client := http.Client{
		Timeout: timeout,
	}

	resp, err := client.Get(api.APIURL)
	if err != nil {
		log.Fatalf("error parsing flags: %v", err)
		return false
	}

	return (resp.StatusCode == http.StatusOK)
}
