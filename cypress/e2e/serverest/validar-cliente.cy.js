const url = Cypress.env('url');
const nome = Cypress.env('nome');
const username = Cypress.env('username');
const password = Cypress.env('password');
const urlapi = Cypress.env('urlapi');
const emailUsuario = Cypress.env('emailUsuario');
const nomeCliente = Cypress.env('nomeCliente');

describe('Validando acesso cliente', () => {
  before(() => {
    cy.cadastroCliente(url, nomeCliente, emailUsuario, password);
  });

  after(() => {
    cy.deletarUsuarioPorEmail(urlapi, emailUsuario, password, emailUsuario);
  });

  it('Validando acesso cliente', () => {
    
  });
});
