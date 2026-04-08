describe("Alert Handler",()=>{

    it("handel windows:alert",()=>{
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('[id="alertbtn"]').click()
        cy.on("window:alert",(str)=>{
            expect(str).to.eq("Hello , share this practice page and share your knowledge")
        })
    })

    it.only("handel conform dialog box",()=>{
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('[id="confirmbtn"]').click()
        cy.on("window:confirm",(str)=> expect(str).to.eq("Hello , Are you sure you want to confirm?"));

        cy.on("window:confirm", () => false); // Click Cancel
    })

})