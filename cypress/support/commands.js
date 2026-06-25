Cypress.Commands.add('login', () => {

  cy.visit('/')

  cy.get('input[type="email"]')
    .type('andre@gmail.com')

  cy.get('input[type="password"]')
    .type('123456')

  cy.contains('Entrar').click()
})