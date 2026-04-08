describe("handel tables", () => {
    it("get the rows of 2nd child", () => {
        cy.get(`table[name="courses"] tbody tr td:nth-child(2)`).each(($el, index, $list) => {
            const textCourse = $el.text()
            if(textCourse.includes("Master Selenium Automation in simple Python Language")){
                cy.get(`table[name="courses"] tbody tr td:nth-child(2)`).eq(index).next().then(($el2)=>{
                    cy.log($el2.text())
                    cy.wrap($el2).should('contain',25)
                })
            }
        })
    })
})