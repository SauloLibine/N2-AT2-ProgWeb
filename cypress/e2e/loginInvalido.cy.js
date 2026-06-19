describe('Login inválido', () => {

  it('deve impedir login com senha incorreta', () => {

    cy.visit('/')

    cy.get('input[type="email"]')
      .type('andre@gmail.com')

    cy.get('input[type="password"]')
      .type('senhaerrada')

    cy.contains('Entrar').click()

    cy.contains('Senha inválida')
  })

})