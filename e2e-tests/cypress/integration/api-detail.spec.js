describe('API Detail', () => {

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.visit('/apis')
      cy.get('[data-test="link"]').first().click();
    })

    it('navigating to the first API Detail page', () => {
      cy.get('[data-test="api-specification-url"]').contains("Specificatie")
      cy.screenshot()
    })

    it('Has no detectable a11y violations on load', () => {
      cy.injectAxe()
      // Test the page at initial load
      cy.checkA11y()
    })
  })


  context('mobile resolution', () => {
    beforeEach(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport('samsung-s10')
      cy.visit('/apis')
      cy.get('[data-test="link"]').first().click();
    })
    it('navigating to the first API Detail page', () => {
      cy.get('[data-test="api-specification-url"]').contains("Specificatie")
      cy.screenshot()
    })
  })
})