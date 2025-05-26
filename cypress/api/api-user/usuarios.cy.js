describe('Testes da API de Usuários - Serverest', () => {
  const urlapi = Cypress.env('urlapi');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  const usuarioBase = {
    nome: 'Usuário Teste API',
    password: '123456',
    administrador: 'true'
  };

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const email = `user_${Date.now()}@mail.com`;
    const usuario = { ...usuarioBase, email };

    cy.request({
      method: 'POST',
      url: `${urlapi}/usuarios`,
      body: usuario
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq('Cadastro realizado com sucesso');

      cy.deletarUsuarioPorEmail(urlapi, username, password, email);
    });
  });

  it('Não deve permitir cadastro com e-mail já existente', () => {
    const email = `user_${Date.now()}@mail.com`;
    const usuario = { ...usuarioBase, email };

    cy.request({
      method: 'POST',
      url: `${urlapi}/usuarios`,
      body: usuario
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${urlapi}/usuarios`,
        body: usuario,
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Este email já está sendo usado');

        cy.deletarUsuarioPorEmail(urlapi, username, password, email);
      });
    });
  });

  it('Deve buscar todos os usuários', () => {
    cy.request(`${urlapi}/usuarios`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('usuarios');
    });
  });

  it('Deve validar campos obrigatórios no cadastro', () => {
    cy.request({
      method: 'POST',
      url: `${urlapi}/usuarios`,
      body: {},
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('nome');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('password');
    });
  });

  it('Deve realizar login com sucesso', () => {
    const email = `login_${Date.now()}@mail.com`;
    const usuario = { ...usuarioBase, email };

    cy.request({
      method: 'POST',
      url: `${urlapi}/usuarios`,
      body: usuario
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${urlapi}/login`,
        body: {
          email,
          password: usuario.password
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Login realizado com sucesso');
        expect(res.body).to.have.property('authorization');

        cy.deletarUsuarioPorEmail(urlapi, username, password, email);
      });
    });
  });

  it('Não deve logar com senha incorreta', () => {
    const email = `senhaerrada_${Date.now()}@mail.com`;
    const usuario = { ...usuarioBase, email };

    cy.request({
      method: 'POST',
      url: `${urlapi}/usuarios`,
      body: usuario
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${urlapi}/login`,
        body: {
          email,
          password: 'senhaErrada'
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Email e/ou senha inválidos');

        cy.deletarUsuarioPorEmail(urlapi, username, password, email);
      });
    });
  });

  it('Não deve logar com e-mail inexistente', () => {
    cy.request({
      method: 'POST',
      url: `${urlapi}/login`,
      body: {
        email: `inexistente_${Date.now()}@email.com`,
        password: '123456'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Email e/ou senha inválidos');
    });
  });
});
