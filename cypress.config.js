const { defineConfig } = require("cypress");
//require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 10000,
  viewportWidth: 1536,
  viewportHeight: 960,

  e2e: {
    setupNodeEvents(on, config) {
      // Carrega as variáveis de ambiente do sistema no Cypress
    //  config.env.username = process.env.CYPRESS_USERNAME;
    //  config.env.password = process.env.CYPRESS_PASSWORD;
  
    //  config.env.usernameApi = process.env.CYPRESS_USERNAMEAPI;
    //  config.env.passwordApi = process.env.CYPRESS_PASSWORDAPI;

      return config;
    },
    experimentalRunAllSpecs: true,
    specPattern: [
       'cypress/api/**/*.cy.{js,jsx,ts,tsx}',
       'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    ]
  }
});