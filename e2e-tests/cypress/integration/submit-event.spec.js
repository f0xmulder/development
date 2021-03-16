import { terminalLog } from "../support"

describe('Submit Event', () => {
  context('desktop resolution', () => {
    beforeEach(() => {
      cy.visit('/events/add')
    })

    it('should show the page title', () => {
      cy.get('h1').contains('Event toevoegen')
      cy.screenshot()
    })

    it('Has no detectable a11y violations on load', () => {
      cy.injectAxe()
      // Test the page at initial load
      cy.checkA11y(null, null, terminalLog)
    })
  })

  context('mobile resolution', () => {
    beforeEach(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport('samsung-s10')
      cy.visit('/events/add')
    })
    it('should show the page title', () => {
      cy.get('h1').contains('Event toevoegen')
      cy.screenshot()
    })

  })
})