const { terminalLog, sizes } = require("../support")

describe('Home', () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit('/')
  })

  it('should show the page title', () => {
    cy.get('h1').contains('Eén centrale plek voor de developer die voor of met de overheid ontwikkelt')
    cy.screenshot()
  })

  context('Header', () => {
    const links = [
      { name: 'Developer', url: 'https://developer.overheid.nl' },
      { name: 'Forum', url: 'https://forum.developer.overheid.nl' },
      { name: 'GitLab', url: 'https://gitlab.com/commonground/don/developer.overheid.nl' },
    ]

    links.forEach(link => {
      it(`should have a ${link.name} link`, () => {
        const el = cy.get('nav').contains(link.name)
        el.screenshot()
        el.click()
        cy.url().should('include', link.url)
      })
    })
  })

  context('Navigation', () => {
    const links = [
      { name: 'Home', url: baseUrl },
      { name: "API's", url: `${baseUrl}/apis` },
      { name: 'Events', url: `${baseUrl}/events` },
      { name: 'Code', url: `${baseUrl}/code` },
      { name: 'Over', url: `${baseUrl}/about` },
    ]

    links.forEach(link => {
      it(`should have a ${link.name} link`, () => {
        const el = cy.get('nav').contains(link.name)
        el.screenshot()
        el.click()
        cy.url().should('include', link.url)
      })
    })
  })

  context('Cards', () => {
    const cards = [
      { name: "Bekijk API’s", testId: 'card-apis', url: `/apis` },
      { name: "Ga naar forum", testId: 'card-forum', url: 'https://forum.developer.overheid.nl/' },
    ]

    cards.forEach(card => {
      it(`should have a "${card.name}" card`, () => {
        const el = cy.get(`[data-testid="${card.testId}"]`)
        el.screenshot()
        cy.contains(card.name).click()
        cy.url().should('include', card.url)
      })
    })
  })

  it('should have a create issue button', () => {
    const el = cy.contains('Melding maken op GitLab')
    el.screenshot()
    // Remove target to open in current window
    el.invoke('removeAttr', 'target').click()
    cy.url().should('include', 'https://gitlab.com/commonground/don/developer.overheid.nl/-/issues')
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/')
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