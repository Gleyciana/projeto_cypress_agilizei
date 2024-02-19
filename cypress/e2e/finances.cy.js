/// <reference types="cypress" />

const { it } = require("mocha");

beforeEach(() => {
  cy.visit('https://devfinance-agilizei.netlify.app/')

});

describe('Transações', () => {
  it('Cadastrar uma entrada', () => { 
    criarTransacao('Freela',250)

    cy.get('tbody tr td.description')
       .should('have.text', 'Freela')
       
  });

  it('Cadastrar uma saída', () => {
    criarTransacao('Cinema',-40) 
    cy.get('tbody tr td.description')
       .should('have.text', 'Cinema')
    
  });

  it('Excluir transação', () => {
    criarTransacao('Freela',100)
    criarTransacao('Mesada',10)

    //cy.contains('.description', 'Freela')
    //  .parent()
    //  .find('img')
    //  .click()
   
    cy.contains('.description', 'Freela')
      .siblings()
      .children('img')
      .click()


    cy.get('tbody tr').should('have.length',1 )
    
  });
 
});

function criarTransacao(descricao, valor) {
cy.visit('https://devfinance-agilizei.netlify.app/#')
cy.contains('Nova Transação').click()
cy.get('#description').type(descricao)
cy.get('#amount').type(valor)
cy.get('#date').type('2023-07-23') // yyyy-mm-dd

cy.contains('button', 'Salvar').click()
}
