describe('Página Relatório', () => {

  it('deve acessar a página Relatório', () => {

    cy.visit('http://localhost:5173')

    cy.contains('SIM').click()

    cy.contains('RELATÓRIO').click()

    cy.url().should('include', 'localhost')

  })

})