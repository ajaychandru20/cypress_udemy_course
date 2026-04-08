describe("Add the products into cart", () => {
    it("", () => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')
        cy.get('div[class="card h-100"]:contains(iphone X) button:contains(Add)').click()
        cy.get('div[class="card h-100"]:contains(Samsung Note 8) button:contains(Add)').click()
        cy.get('[id="navbarResponsive"] a:contains(Checkout)').click()

        let totalAmount = 0;
        cy.get('table tbody tr td:nth-child(4):contains(₹)').each((amount) => {
            const amountNumber = (amount.find('strong').text()).replace(/[^0-9]/g, "");
            totalAmount = totalAmount + Number(amountNumber)
        }).then(() => {
            cy.log(totalAmount)
            cy.get('table tbody tr:contains(Total) strong').then((totalamount)=>{
                const finalAmount = Number((totalamount.text()).replace(/[^0-9]/g, ""));
                cy.log(finalAmount);
                expect(finalAmount).to.eq(totalAmount)
                cy.get('button:contains(Checkout)').click()
                cy.url().then((url)=>{
                    cy.wrap(url).should('contain','https://rahulshettyacademy.com/angularpractice/shop')
                    cy.get(`[id="country"]`).type("India")
                    cy.wait(5000)
                    cy.get(`[class="suggestions"]`).click()
                    cy.get('input[id="checkbox2"]').then((checkbox)=>{  
                        const booleanValue = checkbox.is(`:checked`)
                        cy.log(booleanValue)
                        if(booleanValue != true){
                            cy.get('label[for="checkbox2"]').click()
                        }
                    })
                    cy.get('label[for="checkbox2"]').should('contain',"I agree with the term & Conditions")
                })
            })
        })

    })
})