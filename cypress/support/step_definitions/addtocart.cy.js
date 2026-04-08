import { Given, Then, And } from "@badeball/cypress-cucumber-preprocessor";
const { addToCart } = require("../../pages/PageObjectModel/AddToCart");

Given("visit the electronics portal", () => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

})
Then("add the products in the cart", () => {
    addToCart.addProductsToCart()
})

Then("assert the products that we added", () => {
    addToCart.assertChekoutKart()
})

Given("visit the ecom portal", () => {
    cy.LoginAPI().then(() => {
        cy.visit('https://rahulshettyacademy.com/client/#/auth/login', {
            onBeforeLoad: () => {
                window.localStorage.setItem('token', Cypress.env('token'))
            }
        })
    })

})

Then("add the product to the Cart", () => {
    cy.contains('.card', 'ADIDAS')
        .find('button')
        .contains('Add To Cart')
        .click()
    // cy.get('[class="card"]:contains(ADIDAS)').find('button').contains('Add To Cart').click()
    cy.get('nav button').contains('Cart').click()
})

Then("assert the products that we added in the cart",()=>{
    cy.get('[class="cart"]').then(($cart)=>{
        cy.wrap($cart).find('[class="itemImg"]').should('have.attr','src').and('include','https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959265156.jpg')
        cy.wrap($cart).find('[class="itemNumber"]').should('contain','#6960eae1c941646b7a8b3ed3')
        cy.get('[class="cartSection"] h3').should('contain',"ADIDAS ORIGINAL")
        cy.get('[class="cartSection"] p').should('contain'," MRP $ 11500")
        cy.get('[class="stockStatus"]').should('contain'," In Stock")
        cy.get('.prodTotal p').should('contain',"$ 11500")
        cy.get('button').contains('Checkout').click()
        
    
    
    })
})