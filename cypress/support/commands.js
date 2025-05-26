let accessToken;

import 'cypress-xpath'
import 'cypress-file-upload'

Cypress.Commands.add('authenticate', (urlapi, username, password) => {
  return cy.request({
    method: 'POST',
    url: `${urlapi}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: {
      email: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('authorization');

    return {
      accessToken: response.body.authorization,
    };
  });
});

Cypress.Commands.add('deletarUsuarioPorEmail', (urlapi, username, password, emailParaDeletar) => {
  return cy.authenticate(`${urlapi}`, username, password).then(({ accessToken }) => {
    return cy.request({
      method: 'GET',
      url: `${urlapi}/usuarios?email=${emailParaDeletar}`, 
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      const usuarios = response.body.usuarios;
      const usuario = usuarios.find(u => u.email === emailParaDeletar);

      if (usuario) {
        const userId = usuario._id;

        return cy.request({
          method: 'DELETE',
          url: `${urlapi}/usuarios/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          failOnStatusCode: false
        });
      } else {
        cy.log(`Usuário com email ${emailParaDeletar} não encontrado`);
      }
    });
  });
});

Cypress.Commands.add('loginViaUi', (url, username, password) => {
  cy.visit(url)
  cy.get('[data-testid="email"]', { setTimeout: 3000 }).type(username)
  cy.get('[data-testid="senha"]').type(password)
  cy.get('[data-testid="entrar"]', { setTimeout: 3000 }).click()
});


Cypress.Commands.add('verificaOuCadastraUsuario', (url, nome, username, password) => {
  cy.visit(url);
  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(nome);
  cy.get('[data-testid="email"]').type(username);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="checkbox"]').click();
  cy.get('[data-testid="cadastrar"]').click();

  // Verifica se alerta de email apareceu
  cy.get('.alert', { timeout: 5000 }).then($el => {
  if ($el.text().includes('Este email já está sendo usado')) {
    cy.loginViaUi(url, username, password);
  } else {
    cy.url().should('not.include', '/cadastrarusuarios');
  }
  });
});

Cypress.Commands.add('cadastroCliente', (url, nomeCliente, emailUsuario, password) => {
  cy.visit(url);
  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(nomeCliente);
  cy.get('[data-testid="email"]').type(emailUsuario);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="cadastrar"]').click();

  // Verifica se alerta de email apareceu
  cy.get('.alert', { timeout: 5000 }).then($el => {
  if ($el.text().includes('Este email já está sendo usado')) {
    cy.loginViaUi(url, emailUsuario, password);
  } else {
    cy.url().should('not.include', '/cadastrarusuarios');
  }
  });
});

Cypress.Commands.add('cadastrarUsuario', (nome, emailUsuario, password) => {
  cy.get('[data-testid="cadastrarUsuarios"]').click();
  cy.get('[data-testid="nome"]').type(nome);
  cy.get('[data-testid="email"]').type(emailUsuario);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="cadastrarUsuario"]').click();
  cy.url().should('not.include', '/cadastrarusuarios');
});

Cypress.Commands.add('anexarImagem', () => {
  cy.fixture('notebook.jpg', 'base64').then(fileContent => {
    cy.get('input[type="file"]').attachFile({
      fileContent: fileContent,
      fileName: 'notebook.jpg',
      mimeType: 'image/jpeg',
      encoding: 'base64'
    });
  });
});


Cypress.Commands.add('cadastrarProduto', (nomedoproduto, Preçodoproduto, Descriçãodoproduto, Quantidadedoproduto) => {
  cy.get('[data-testid="cadastrar-produtos"]').click();
  cy.get('[data-testid="nome"]').type(nomedoproduto);
  cy.get('[data-testid="preco"]').type(Preçodoproduto);
  cy.get('[data-testid="descricao"]').type(Descriçãodoproduto);
  cy.get('[data-testid="quantity"]').type(Quantidadedoproduto);
  cy.get('[data-testid="imagem"]').click();
  cy.anexarImagem();
  cy.get('[data-testid="cadastarProdutos"]').click();
  cy.url().should('not.include', '/cadastrarprodutos');
});

Cypress.Commands.add('excluirProdutoNaTela', (nomeProduto) => {
  cy.contains('td', nomeProduto, { timeout: 10000 }).scrollIntoView().should('be.visible').then(($td) => {
    const $tr = $td.closest('tr');
    cy.contains('td', 'NotebookASUS').siblings().find('button.btn-danger').click();
    cy.on('window:confirm', () => true);
  });
});



