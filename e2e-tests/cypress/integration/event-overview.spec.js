const { terminalLog, sizes } = require("../support")

describe('Event Overview', () => {
  beforeEach(() => {
    const results = []
    for (let i = 1; i <= 50; i++) {

      const startDate = new Date(Date.now() + i * 24 * 60 * (60 + i) * 1000)
      results.push({
        id: i,
        title: `Event ${i}`,
        start_date: startDate,
        location: `Amsterdam (${i})`,
        registration_url: `https://www.meetup.com/events/${i}`,
      })
    }

    const apiResponse = {
      page: 1,
      rowsPerPage: 10,
      totalResults: results.length,
      results,
    }
    // Mock events
    cy.intercept('GET', /api\/events/, {
      statusCode: 200,
      body: apiResponse
    })

    cy.visit('/events')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Aankomende events')
    cy.screenshot()
  })

  it('should have an add event button', () => {
    const button = cy.contains('Event toevoegen')
    button.screenshot()
    button.click()
    cy.url().should('include', '/events/add')
  })

  it('should have a list of events', () => {
    cy.contains('Event 1').parent().parent().as('event')
    cy.get('@event').screenshot()
    cy.contains('Naar event pagina').first().invoke('removeAttr', 'target').click()
    cy.url().should('include', `https://www.meetup.com/events/1`)
  })

  it('should have pagination', () => {
    const pagination = cy.get('[data-testid="pagination"]')
    pagination.screenshot()
    pagination.get('button').eq(2).click()
    cy.url().should('include', `pagina=2`)
  })

  it.skip('should have results per page', () => {
    const resultsPerPage = cy.get("#resultsPerPage").as('select')
    resultsPerPage.parent().screenshot()
    cy.get('@select').select('25').should('have.value', '25')
    cy.url().should('include', `aantalPerPagina=25`)
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/events')

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