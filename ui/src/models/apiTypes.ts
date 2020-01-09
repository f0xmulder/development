export type Badge = string

export type Tag = string

export type TermsOfUse = {
  governmentOnly: boolean
  payPerUse: boolean
  uptimeGuarantee?: number
  supportResponseTime?: string
}

export type Scores = {
  hasDocumentation?: boolean
  hasSpecification?: boolean
  hasContactDetails?: boolean
  providesSla?: boolean
}

export type Relations = {
  [key: string]: [string]
}

export type Contact = {
  email?: string
  phone?: string
  fax?: string
  chat?: string
  url?: string
}

export type Api = {
  id: string
  serviceName: string
  organizationName: string
  description: string
  apiUrl: string
  apiType: string
  specificationUrl: string
  documentationUrl: string
  badges: Badge[]
  tags: Tag[]
  isReferenceImplementation: boolean
  relations?: Relations
  termsOfUse: TermsOfUse
  scores: Scores
  contact?: Contact
}

// Backend uses snake_case - prefixed with "Go" ---

export type GoTermsOfUse = {
  government_only: boolean
  pay_per_use: boolean
  uptime_guarantee?: number
  support_response_time?: string
}

export type GoScores = {
  has_documentation?: boolean
  has_specification?: boolean
  has_contact_details?: boolean
  provides_sla?: boolean
}

export type GoApi = {
  id: string
  service_name: string
  organization_name: string
  description: string
  api_url: string
  api_type: string
  specification_url: string
  documentation_url: string
  badges: Badge[]
  tags: Tag[]
  is_reference_implementation: boolean
  relations?: Relations
  terms_of_use: GoTermsOfUse
  scores: GoScores
  contact?: Contact
}
