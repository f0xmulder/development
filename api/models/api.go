package models

// API model
type API struct {
	OrganizationName     string `json:"organization_name"`
	ServiceName          string `json:"service_name"`
	APIURL               string `json:"api_url"`
	APISpecificationType string `json:"api_specification_type"`
	SpecificationURL     string `json:"specification_url"`
	DocumentationURL     string `json:"documentation_url"`
}
