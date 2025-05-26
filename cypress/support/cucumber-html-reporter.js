var reporter = require('cucumber-html-reporter');

var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s";
var dateTime = date+'_'+time;

var options = {
  theme: 'bootstrap',
    jsonFile: 'cypress/cucumber-json/',
    output: "cypress/reports/report_"+dateTime+".html",
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
      "Test Environment": "Teste-QA",
      "Browser": "Chrome 117",
      "Platform": "Windows 11",
      "Executed": "Local"
    }
  };