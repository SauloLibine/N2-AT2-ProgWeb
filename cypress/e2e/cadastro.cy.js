describe('Cadastro', () => {

  it('deve cadastrar um usuário', () => {

    const email = `teste${Date.now()}@gmail.com`;

    cy.visit('/')

    cy.contains('Criar nova conta').click()

    cy.get('input[type="text"]')
      .type('Renato Cypress')

    cy.get('input[type="email"]')
      .type(email)

    cy.get('input[type="password"]')
      .type('123456')

    cy.contains('Registrar').click()

    cy.contains('Bem-vindo')
  })

})