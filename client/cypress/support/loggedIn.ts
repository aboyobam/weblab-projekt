export default function loggedIn(cy: Cypress.cy, username?: string) {
    cy.intercept("GET", "/api/user", { success: !!username, username });
}