describe('Logout', () => {

  beforeEach(() => {
    cy.login()
  })

  it('deve sair do sistema', () => {

    cy.contains('Sair').click()

    cy.contains('Entrar')
  })

})