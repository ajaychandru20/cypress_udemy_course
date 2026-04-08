describe("Handeling the calender diff types", () => {
    it("select the date", () => {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        cy.xpath(`//*[local-name()='svg']`).eq(1).click()
        // cy.get('abbr[aria-label="February 4, 2026"]').click()


        let day = "4"
        let month = "1"
        let year = "2026"

        const dateSelected = [month, day, year]

        cy.get('[class="react-calendar__navigation__label"]').then(($month) => {

            cy.wrap($month).should('contain', "February 2026").click()
            cy.get('.react-calendar__year-view__months button:contains(January)').click()
            cy.get('abbr[aria-label="January 4, 2026"]').click()

            cy.get('[name="year"]').invoke('val').then(($val) => { cy.log($val) });
            cy.get('[name="year"]').should('have.value', year);

            cy.get(`.react-date-picker__inputGroup__input`).each(($el, index) => {
                cy.wrap($el).invoke('val').then((valueDate) => {
                    cy.wrap(valueDate).should('eq', dateSelected[index]);
                })
            })

        })
    })
})