const { defineConfig } = require("cypress");
//require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 10000,
  viewportWidth: 1536,
  viewportHeight: 960,

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    experimentalRunAllSpecs: true,
    specPattern: [
       'cypress/api/**/*.cy.{js,jsx,ts,tsx}',
       'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    ]
  }
});