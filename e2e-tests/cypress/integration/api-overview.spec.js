const { terminalLog, sizes } = require("../support")

describe('API Overview', () => {

  beforeEach(() => {
    cy.visit('/apis')
  })

  it('should show the page title', () => {
    cy.get('h1').contains("API's binnen de Nederlandse overheid")
    cy.screenshot()
  })

  it('should have an add API button', () => {
    const button = cy.contains('API toevoegen')
    button.screenshot()
    button.click()
    cy.url().should('include', '/apis/add/form')
  })

  it('should have a search API field', () => {
    const input = cy.get('input')
    input.screenshot()
    input.type("xxx")
    cy.contains("Er zijn (nog) geen API's beschikbaar.")
  })

  it('should have filters for API type', () => {
    const checkbox = cy.get('[type="checkbox"]').first().parent().click()
    checkbox.screenshot()
    cy.url().should('include', '/apis?type=rest_json')
  })

  it('should have filters for organisation', () => {
    cy.get('[data-test="content"]').within(() => {
      const checkbox = cy.get('[type="checkbox"]').first().parent().click()
      checkbox.screenshot()
      cy.get('[type="checkbox"]').first().parent().then(function (elem) {
        const regexOrg = /^.*(?=(\(\d*\)))/
        const regExNum = /^.*?\([^\d]*(\d+)[^\d]*\).*$/
        const filter = regexOrg.exec(elem.text())[0].split(" ")[0]
        const number = regExNum.exec(elem.text())[1]

        cy.root().closest('main').contains(`${number} API`)

        cy.url().should('include', `apis?organisatie=${filter}`)
      })
    })
  })

  it(`should have a list of API's`, () => {
    cy.get('[data-test="link"]').first().as("link")
    cy.get("@link").screenshot()

    cy.get('[data-test="link"] > div').first().then(function(elem){
      cy.get("@link").click()
      cy.url().should('include', elem.text().toLowerCase())
    })
  })

  it('should have pagination', () => {
    const pagination = cy.get('[data-testid="pagination"]')
    pagination.screenshot()
    pagination.get('button').eq(4).click()
    cy.url().should('include', `pagina=2`)
  })

  it('should have results per page', () => {
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
        cy.visit('/apis')
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