import { sizes, terminalLog } from "../support"

describe('Submit Event', () => {
  beforeEach(() => {
    cy.visit('/events/add')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Event toevoegen')
  })

  it('should have a form', () => {
    cy.intercept('POST', '/api/events', { fixture: 'submit-event.json' })

    cy.get('input[name="title"]').type("Event title")
    cy.get('input[name="startDate"]').type(`${new Date().getFullYear()}-12-31`)
    cy.get('input[name="startTime"]').type("10:00")
    cy.get('input[name="location"]').type("Amsterdam")
    cy.get('input[name="registrationUrl"]').type("https://registrationUrl.url")
    cy.get('button').parent().screenshot()
    cy.get('button').parent().toMatchImageSnapshot();
    cy.get('button').contains('Event toevoegen').click()
    cy.contains('Het event is toegevoegd. Wij zullen deze zo snel mogelijk nakijken.').screenshot()
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