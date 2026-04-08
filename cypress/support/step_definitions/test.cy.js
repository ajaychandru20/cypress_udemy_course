const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const { excel } = require("../../pages/EditExcel/exceljs");

Given("sample test", () => {

    // cy.task("queryDb", "SELECT * FROM users").then((data) => {
    //     cy.log(JSON.stringify(data));

    //     expect(data.length).to.equal(3);
    //     expect(data[0]).to.have.property("name");
    // });
    const searchTextValue = "Apple"
    const replaceValue = 200;
    excel.visitDownloadExcel()

    cy.task('writeTaskExcel', {searchText:searchTextValue, replaceText:replaceValue, change:{rowNumber:0,columnNumber:2}, filePath:'cypress/downloads/download.xlsx'})
    // cy.task('uploadFile',('[id="fileinput"]','cypress/downloads/download.xlsx'))
    excel.uploadExcelfile(searchTextValue,replaceValue)


    // cy.intercept({
    //     method: 'GET', // Route all GET requests
    //     url: '/users/*', // that have a URL that matches '/users/*'
    // },
    //     [] // and force the response to be: []
    // ).as('getUsers') // and assign an alias
})