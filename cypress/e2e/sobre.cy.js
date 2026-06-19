describe('Página Sobre', () => {

  it('deve acessar a página Sobre', () => {

    cy.visit('http://localhost:5173')

    cy.contains('SIM').click()

    cy.contains('SOBRE').click()

    cy.url().should('include', 'localhost')

  })

})