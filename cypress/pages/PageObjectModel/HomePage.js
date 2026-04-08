export default class HomePage {

    // constructor(username, password) {
    //     this.username = username;
    //     this.password = password;
    // }

    homePage(username,password) {
        cy.get(`[name="username"]`).type(username)
        cy.get(`[name="password"]`).type(password)
    }


}
