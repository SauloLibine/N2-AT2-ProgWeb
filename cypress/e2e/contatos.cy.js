describe('Página Contatos', () => {

  it('deve acessar a página Contatos', () => {

    cy.visit('http://localhost:5173')

    cy.contains('SIM').click()

    cy.contains('CONTATOS').click()

    cy.url().should('include', 'localhost')

  })

})