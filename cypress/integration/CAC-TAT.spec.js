/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
      })

      it('verifica o título da aplicação', () => {
        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

      it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Paulo', { delay: 200 })
        cy.get('#lastName').type('Neto', { delay: 200 })
        cy.get('#email').type('neto@gmail.com', { delay: 140 })
        cy.get('#open-text-area').type('Teste', { delay: 200 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

      it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Paulo', { delay: 200 })
        cy.get('#lastName').type('Neto', { delay: 200 })
        cy.get('#email').type('neto@', { delay: 140 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should("be.visible")
      })

      it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
          .type('abgdfgdf')
            .should('have.value', "")
      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Paulo')
        cy.get('#lastName').type('Neto')
        cy.get('#email').type('neto@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should("be.visible")
      })

      it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Paulo').should('have.value', 'Paulo')
          .clear().should('have.value', '')
        cy.get('#lastName').type('Neto').should('have.value', 'Neto')
        .clear().should('have.value', '')
        cy.get('#email').type('neto@gmail.com').should('have.value', 'neto@gmail.com')
        .clear().should('have.value', '')
        cy.get('#phone').type('997676654').should('have.value', '997676654')
        .clear().should('have.value', '')
      })

      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should("be.visible")
      })

      it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
      })

      it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
      })
      
      it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
      })

      it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select("mentoria").should('have.value', 'mentoria')
      })

      it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
        // cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
      })
      

      it('marca cada tipo de atendimento', () => {
        // cy.get('input[type="radio"]').check('ajuda').should('have.checked')
        // cy.get('input[type="radio"]').check('elogio').should('have.checked')
        // cy.get('input[type="radio"]').check('feedback').should('have.checked')
        cy.get('input[type="radio"]')
          .should('have.length', 3)
            .each( ($radio) => {
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
            })
      })

      it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          
          .last().uncheck()
          .should('not.be.checked')
      })

      it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
          .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should( ($input) => {
              expect($input[0].files[0].name).to.equal('example.json')
            })
      })

      it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
          .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should( ($input) => {
              expect($input[0].files[0].name).to.equal('example.json')
            })
      })

      it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
          .get('input[type="file"]')
            .selectFile('@sampleFile')
            .should( ($input) => {
              expect($input[0].files[0].name).to.equal('example.json')
            })
      })

      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy > a').should('have.attr', 'target', '_blank')
      });

      it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy > a')
          .invoke('removeAttr', 'target')
          .click()

          cy.contains('Talking About Testing').should('be.visible')
      });

      it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy > a')
        .invoke('removeAttr', 'target')
        .click()

        cy.get('#title').should('be.visible')
        cy.get('#white-background').contains('Não salvamos dados submetidos').should('be.visible')
      });
  })
