describe('Login válido', () => {

  it('deve realizar login com sucesso', () => {

    cy.visit('/')

    cy.get('input[type="email"]')
      .type('andre@gmail.com')

    cy.get('input[type="password"]')
      .type('123456')

    cy.contains('Entrar').click()

    cy.contains('Bem-vindo')
  })

})