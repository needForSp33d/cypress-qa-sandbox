/// <reference types="cypress" />

const url = 'https://booking.manchesterairport.co.uk/lounges/dates/'

//TODO: can this be ripped out?
describe('MAN - Lounge - Content Check', () => {
  beforeEach(() => {
      cy.visit(url)
      cy.get('#onetrust-accept-btn-handler').click()
  })

  it('header displayed as expected', () => {
    // Validate different header elements displayed to user
    cy.get('.header__logo-link').should('exist')
    cy.get('.header__progress-tracker').should('exist')
    //TODO: Reference data file for page heading
    cy.get('.page-heading').should('contain.text', 'Book official airport lounges')
    cy.get('.header__utility-links').should('exist')
  })

  it('product search widget components displayed', () => {
    // Validate product search fields displayed to user
    cy.get('#entryDate.input__element').should('exist')
    cy.get('#EntryTime.input__element').should('exist')
    cy.get('.lounges-ticket-number').should('exist')
    cy.get('#qa-find-lounges').should('exist')
  })

  it('footer displayed as expected', () => {
    //Validates footer elements displayed to user
    //TODO: Reference data file for footer copy
    cy.get('.col-footer-copy').should('contain.text', '© 2024 MAG Airport Limited. All rights reserved.')
    //TODO:add checks for pp, t&cs, cookies to footer
  })
})

describe('MAN - Lounge - E2E Check', () => {
  it('Validates critical happy path to payment screen working', () => {
    cy.visit(url);
    cy.get('#onetrust-accept-btn-handler').click()
    cy.get('#entryDate').click()
    cy.get('.pika-next').click()
    cy.get('[data-pika-day=3]').click()
    cy.get('#EntryTime.input__element').select('09:00')
    cy.get('#chosenTerminal').select('T2')

    cy.get('#stepper-plus-adultundefined').click()
    cy.get('#stepper-plus-childundefined').click()

    cy.get('#qa-find-lounges').click()

    //TODO: step 2 - grab the lounge price & store it as price1

    cy.get('.button.button--primary.button--arrow').click()
    cy.get('#qa-continue-to-payment').click()

    //TODO: step 3 - store lounge price as price2 and assert against price1

    cy.get('#FirstName').should('exist')
    cy.get('#LastName').should('exist')
    cy.get('#EmailAddress').should('exist')
    cy.get('#ConfirmEmailAddress').should('exist')

    cy.get('.field__group > .button').should('exist')
  })
})
