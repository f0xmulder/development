const { terminalLog, sizes } = require("../support");

describe('API Detail', () => {

  beforeEach(() => {
    cy.visit('/apis')
    cy.get('[data-test="link"]').first().click();
  })

  it('navigating to the first API Detail page', () => {
    cy.get('[data-test="api-specification-url"]').contains("Specificatie")
    cy.screenshot()
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/apis')
        cy.get('[data-test="link"]').first().click();

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