import loggedIn from "../support/loggedIn";

describe("Logout", () => {
    it("Should logout", () => {
        const username = "testerer";
        loggedIn(cy, username);
        cy.intercept('POST', '/api/logout', req => req.reply({ success: true })).as('logout');
        cy.visit('/');
        
        cy.get("a").contains(username).click();
        cy.get("a.dropdown-item").contains("Logout").click();
        cy.wait('@logout');

        cy.get("a").contains("Login");
    });
});