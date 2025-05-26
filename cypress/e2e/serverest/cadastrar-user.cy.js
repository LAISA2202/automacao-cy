const url = Cypress.env('url');
const nome = Cypress.env('nome');
const username = Cypress.env('username');
const password = Cypress.env('password');
const urlapi = Cypress.env('urlapi');
const emailUsuario = Cypress.env('emailUsuario');

describe('Cadastrar usuário com sucesso', () => {
  before(() => {
    cy.verificaOuCadastraUsuario(url, nome, username, password);
  });

  after(() => {
    cy.deletarUsuarioPorEmail(urlapi, emailUsuario, password, emailUsuario);
  });

  it('Realiza o cadastro de um novo usuário e valida mensagem de sucesso', () => {
    cy.cadastrarUsuario(nome, emailUsuario, password);
  });
});
