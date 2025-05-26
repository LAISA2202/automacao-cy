
# Projeto de Automação com Cypress

Este projeto utiliza o Cypress para automação de testes end-to-end (E2E), com integração de chamadas à API para manipulação de dados de teste.

---

## 📁 Estrutura do Projeto

```plaintext

AUTOMACAO/
├── .vscode/                      # Configurações do VSCode
├── cypress/
│   ├── api/
│   │   └── api-user/
│   │       └── usuarios.cy.js    # Testes da API de usuários
│   ├── downloads/                # Downloads de arquivos gerados nos testes
│   ├── e2e/
│   │   ├── serverest/
│   │   │   ├── cadastrar-produto.cy.js     # Teste E2E de cadastro de produto
│   │   │   ├── cadastrar-user.cy.js        # Teste E2E de cadastro de usuário
│   │   │   └── validar-cliente.cy.js       # Teste E2E de homepage de cliente
│   ├── fixtures/                 # Arquivos de dados para testes
│   ├── support/                 
│   │   ├── commands.js           # Comandos e configurações globais
│   │   ├── cucumber-html-reporter.js
│   │   ├── e2e.js
│   │   └── index.js
├── node_modules/                # Dependências do projeto
├── .gitignore                   # Arquivos e pastas ignorados pelo Git
├── cypress.config.js           # Configurações do Cypress
├── cypress.env.json            # Variáveis de ambiente
├── package.json                # Dependências e scripts do projeto
├── package-lock.json           # Controle de versões exatas das dependências
├── README.md                   # Documentação do projeto
└── notebook.jpg                # Imagem de apoio


## 🧰 Tecnologias Utilizadas

* [Cypress](https://www.cypress.io/) 10.0.0 ou superior
* Node.js (recomenda-se a versão LTS)

---

## 🚀 Como instalar e executar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/LAISA2202/automacao-cy.git
```

2. **Instale as dependências:**

```bash
npm init -y
npm install cypress
npm audit fix --force
```

3. **Execute os testes:**

```bash
npx cypress open
```

Ou em modo headless:

```bash
npx cypress run
```

---

## 🔄 Estratégia de Limpeza de Massa de Dados

Durante a execução dos testes E2E, fiz uso de requisições à *API da aplicação* para:

* Excluir usuários criados ao final dos testes.
* Garantir que cada teste seja *independente*, sem depender de cadastros anteriores.
* Evitar acúmulo de *massa de teste lixo* no sistema.

Essa abordagem proporciona maior controle e confiabilidade nos testes.

---

## 📝 Observações e Sugestões

Durante a automação, foram identificadas algumas oportunidades de melhoria na aplicação:

* **Falta de botão de listagem de usuários cadastrados:** Não há, na interface, uma opção clara para visualizar, editar ou excluir os usuários. Por conta disso, essas ações estão sendo feitas diretamente via API.
* **Não é possível editar usuários ou produtos via tela:** A aplicação não oferece funcionalidade na interface para edição desses registros.
* **Instabilidade na API de exclusão de produtos:** Foi observado que a API destinada à exclusão de produtos apresenta intermitências e, em alguns momentos, não executa corretamente a remoção dos itens.

Esses pontos impactam tanto a experiência do usuário quanto a manutenção dos testes automatizados, e recomenda-se uma avaliação e correção futura.

---
