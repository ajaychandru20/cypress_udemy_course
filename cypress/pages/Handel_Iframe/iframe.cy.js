///<reference types="cypress-iframe" />

import 'cypress-iframe';
describe("handel iframe in web page",()=>{
    it("iframeLoader",()=>{

        cy.visit('https://legacy.rahulshettyacademy.com/')
        cy.frameLoaded('#courses-iframe')

    })
})