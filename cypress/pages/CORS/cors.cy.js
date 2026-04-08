require('@cypress/xpath');
describe("Check multitab open", () => {
    it.skip("handel cors without using origin", () => {

        // it will now open in same tab
        cy.get('[id="opentab"]').invoke('removeAttr', 'target').click()
        cy.xpath(`//div[@id='navbarSupportedContent']/ul/li[3]/a`)
    })

    it("handel cros using origin",()=>{
        cy.get('[id="opentab"]').invoke('removeAttr', 'target').click()

        cy.origin("https://www.qaclickacademy.com",()=>{
            cy.contains('a', 'Blog').click()
            cy.get('h1.wp-block-heading').should('contain', "Mindblown: a blog about philosophy.")
            // cy.xpath(`//div[@id='navbarSupportedContent']/ul/li[3]/a`).click()
        })
    })
})