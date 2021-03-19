const { terminalLog, sizes } = require("../support")

describe('About', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Over Developer Overheid')
    cy.screenshot()
    cy.document()
      .toMatchImageSnapshot();
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/about')
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