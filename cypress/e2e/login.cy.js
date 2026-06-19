describe('Login', () => {

  it('deve acessar a tela de login', () => {

    cy.visit('http://localhost:5173')

    cy.contains('SIM').click()

    cy.contains('LOGIN').click()

    cy.contains('Entrar')

    cy.get('input[type="email"]').should('exist')

    cy.get('input[type="password"]').should('exist')

  })

})