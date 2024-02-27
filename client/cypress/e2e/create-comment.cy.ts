import loggedIn from "../support/loggedIn";

describe("Comment on a module", () => {
    it("Should comment on a module", () => {
        loggedIn(cy, "test");
        cy.intercept('GET', '/api/modules/module/TEST-1', { fixture: "module.json" }).as('module');

        cy.visit('/module/TEST-1');
        cy.wait('@module');

        cy.get("textarea").type("This is a test comment");

        cy.intercept('POST', '/api/modules/comment', (req) => {
            req.reply({
                success: true,
                comment: {
                    author: "test",
                    text: "This is a test comment",
                    updated: new Date().toISOString()
                }
            });
        }).as('comment');

        cy.get("button").contains("Kommentar hinzufügen").click();

        cy.wait('@comment');
        cy.contains("This is a test comment");
    });
});