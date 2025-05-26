const url = Cypress.env('url');
const nome = Cypress.env('nome');
const username = Cypress.env('username');
const password = Cypress.env('password');
const urlapi = Cypress.env('urlapi');
const nomedoproduto = Cypress.env('nomedoproduto');
const Preçodoproduto = Cypress.env('Preçodoproduto');
const Descriçãodoproduto = Cypress.env('Descriçãodoproduto');
const Quantidadedoproduto = Cypress.env('Quantidadedoproduto');


describe('Cadastrando Produto', () => {
  before(() => {
    cy.verificaOuCadastraUsuario(url, nome, username, password);
  });

  after(() => {
    cy.deletarUsuarioPorEmail(urlapi, username, password, username);
  });

  it('Realiza o cadastro de um novo produto e valida mensagem de sucesso', () => {
    cy.cadastrarProduto(nomedoproduto, Preçodoproduto, Descriçãodoproduto, Quantidadedoproduto);
    cy.get('[data-testid="listar-produtos"]').click();
    cy.excluirProdutoNaTela(nomedoproduto);
  });
});


