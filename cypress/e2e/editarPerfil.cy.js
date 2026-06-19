describe('Editar perfil', () => {

  beforeEach(() => {
    cy.login()
  })

  it('deve alterar o nome do usuário', () => {

    cy.contains('Editar perfil').click()

    cy.get('input')
      .first()
      .clear()
      .type('Novo Nome Cypress')

    cy.contains('Salvar').click()

    cy.contains('Novo Nome Cypress')
  })

})