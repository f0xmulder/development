const { terminalLog, sizes, baseUrl } = require("../support")

describe('Submit Code', () => {
  beforeEach(() => {
    cy.visit('/code/add')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Project toevoegen')
  })

  it('should have a form', () => {
    // Fake response on local dev
    if (baseUrl.includes('localhost')) {
      cy.intercept('POST', '/api/code', { fixture: 'submit-api.json' })
    }

    cy.get('input[name="url"]').as('url').type("https://gitlab.com/commonground/don/developer.overheid.nl")
    cy.get('.ReactSelect__control').as('select');

    cy.get('@select').click() // click to open dropdown
      .get('.ReactSelect__menu') // find opened dropdown
      .find('.ReactSelect__option') // find all options
      .first()
      .click() // click on first option
    cy.get('@url').parent().screenshot()
    cy.get('@url').parent().toMatchImageSnapshot();
    cy.get('button').contains('Project toevoegen').click()
    cy.contains("De code is toegevoegd.").screenshot()
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/code/add')
        cy.screenshot()

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