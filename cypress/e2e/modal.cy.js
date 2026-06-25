describe('Verificação de idade', () => {

  it('deve exibir o modal de idade', () => {

    cy.visit('http://localhost:5173')

    cy.contains('Você tem mais de 18 anos?')

    cy.contains('SIM')

    cy.contains('NÃO')

  })

})