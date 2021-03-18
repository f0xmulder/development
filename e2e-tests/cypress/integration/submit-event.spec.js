import { terminalLog } from "../support"

describe('Submit Event', () => {
  beforeEach(() => {
    cy.visit('/events/add')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Event toevoegen')
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
        cy.visit('/events/add')

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