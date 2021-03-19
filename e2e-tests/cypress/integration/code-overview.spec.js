const { terminalLog, sizes } = require("../support")

describe('Code Overview', () => {
  beforeEach(() => {
    // Mock events
    cy.intercept('GET', '/api/code', { fixture: 'code.json' })

    cy.visit('/code')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Code')
    cy.screenshot()
  })

  it('should have an add project button', () => {
    const button = cy.contains('Project toevoegen')
    button.screenshot()
    button.click()
    cy.url().should('include', '/code/add')
  })

  it('should have a search project field', () => {
    const input = cy.get('input')
    input.screenshot()
    input.type("xxx")

    cy.url().should('include', '/code?q=xxx')
  })

  it('should have a filter by language filter', () => {
    cy.get('.ReactSelect__control').as('select');

    cy.get('@select').click() // click to open dropdown
      .get('.ReactSelect__menu') // find opened dropdown
      .find('.ReactSelect__option') // find all options
      .first()
      .click() // click on first option
    cy.get('@select').screenshot()

    cy.url().should('include', 'code?programming_languages=3')
  })

  it('should have a list of projects', () => {
    cy.get('[data-testid="link"]').first().as("link")
    cy.get("@link").screenshot()

    cy.get('[data-testid="link"] > div > div > a').first().as('firstLink').then(function (elem) {
      cy.get('@firstLink').invoke('removeAttr', 'target').click()
      cy.url().should('include', elem.text())
    })
  })

  it('should have pagination', () => {
    const pagination = cy.get('[data-testid="pagination"]')
    pagination.screenshot()
    pagination.get('button').eq(2).click()
    cy.url().should('include', `pagina=2`)
  })

  it('should have results per page', () => {
    const resultsPerPage = cy.get("#resultsPerPage").as('select')
    resultsPerPage.parent().screenshot()
    cy.get('@select').select('10').should('have.value', '10')
    cy.url().should('include', `aantalPerPagina=10`)
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/code')
        cy.document()
          .toMatchImageSnapshot();

        cy.injectAxe()
        // Test the page at initial load
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