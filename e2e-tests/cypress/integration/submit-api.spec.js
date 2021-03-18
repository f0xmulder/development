const { terminalLog, sizes } = require("../support")

describe('Submit API', () => {
  beforeEach(() => {
    cy.visit('/apis/add')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('API toevoegen')
    cy.screenshot()
  })

  it('should have add by form', () => {
    cy.intercept('POST', '/api/submit-api', { fixture: 'submit-api.json' })

    cy.contains('Toevoegen via formulier').as('form')
    cy.get('@form').screenshot()
    cy.get('#serviceName').type("API naam")
    cy.get('#description').type("API description")
    cy.get('#organizationName').type("Organization name")
    cy.get('#apiType').select('REST/JSON').should('have.value', 'rest_json')
    cy.get('#apiAuthentication-none').click()
    cy.get('#productionApiUrl').type("https://productionApiUrl.don.url")
    cy.get('#productionSpecificationUrl').type("https://productionSpecificationUrl.don.url")
    cy.get('#productionDocumentationUrl').type("https://productionDocumentationUrl.don.url")
    cy.get('#hasAcceptanceEnvironment').click()
    cy.get('#acceptanceApiUrl').type("https://acceptanceApiUrl.don.url")
    cy.get('#acceptanceSpecificationUrl').type("https://acceptanceSpecificationUrl.don.url")
    cy.get('#acceptanceDocumentationUrl').type("https://acceptanceDocumentationUrl.don.url")
    cy.get('#hasDemoEnvironment').click()
    cy.get('#demoApiUrl').type("https://demoApiUrl.don.url")
    cy.get('#demoSpecificationUrl').type("https://demoSpecificationUrl.don.url")
    cy.get('#demoDocumentationUrl').type("https://demoDocumentationUrl.don.url")
    cy.get('#contactEmail').type("john.doe@test.com")
    cy.get('#contactPhone').type("+11123456789")
    cy.get('#contactUrl').type("https://contact.me")
    cy.get('#isBasedOnReferenceImplementation').click()
    cy.get('#referenceImplementation').select('Kernregistratie Medewerkers Gemeenschappelijke Regeling Drechtsteden').should('have.value', 'gemeentelijke-regelingen-drechtsteden-kernregistratie-medewerkers')
    cy.get('#termsOfUseGovernmentOnly').click()
    cy.get('#termsOfUsePayPerUse').click()
    cy.get('#termsOfUseUptimeGuarantee').type("{backspace}{backspace}99.99")
    cy.get('#termsOfUseSupportResponseTime').type("1")
    cy.get('button').contains('API toevoegen').click()
    cy.contains('De API is toegevoegd. Wij zullen deze zo snel mogelijk nakijken.')
  })

  it('should have add by MR', () => {
    cy.contains('Via Merge Request').as('MR')
    cy.get('@MR').screenshot()
    cy.get('@MR').click()
    cy.contains('data/{organization}-{api}')
    cy.contains('data/apis/{organization}-{api}.json')
    cy.contains(`{
  "service_name": "Voorbeeld van een API naam",
  "description": "Voorbeeld van een omschrijving",
  "organization_name": "Voorbeeld van een organisatie naam",
  "api_type": "rest_json",
  "api_authentication": "api_key",
  "environments": [
    {
      "name": "production"
      "api_url": "https://api.example.com/service/",
      "specification_url": "https://api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://api.example.com/service/",
    },
    {
      "name": "acceptance"
      "api_url": "https://acpt.api.example.com/service/",
      "specification_url": "https://acpt.api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://acpt.api.example.com/service/",
    },
    {
      "name": "demo"
      "api_url": "https://demo.api.example.com/service/",
      "specification_url": "https://demo.api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://demo.api.example.com/service/",
    }
  ],
  "contact": {
      "email": "helpdesk@voorbeeld.nl",
      "phone": "0031612345678",
      "url": "https://github.com/VNG-Realisatie/nlx"
  },
  "is_reference_implementation": false,
  "relations": {
      "example-api-id": ["reference-implementation"]
  },
  "terms_of_use": {
    "government_only": true,
    "pay_per_use": false,
    "uptime_guarantee": 99.9
  }
}`)
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/apis/add')

        cy.injectAxe()
        // Test the page at initial load
        cy.screenshot()
        cy.checkA11y(null, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a']
          }
        }, terminalLog)
      })
    })
  })

})