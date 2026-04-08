const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { default: HomePage } = require("../../pages/PageObjectModel/HomePage");
import data from '../../fixtures/example.json'

const homePage = new HomePage();

Given("the greencart platform", () => {
    cy.visit('http://localhost:8080/web/index.php/auth/login');
})
Then("enter username and password", function () {

    homePage.homePage(this.data.username, this.data.password);
    cy.log(data.email)
})
Then("click login button", () => {
    cy.get('button').contains('Login').click()
})
