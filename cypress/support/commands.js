Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Neto')
    cy.get('#email').type('neto@gmail.com')
    cy.get('#phone').type('997676654')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})