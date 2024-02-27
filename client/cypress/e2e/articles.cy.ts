import loggedIn from "../support/loggedIn";

describe('Should visit the articles page', () => {
  beforeEach(() => {
    loggedIn(cy, "test");
    cy.visit('/articles');
    cy.intercept('GET', '/api/articles', { fixture: "articles.json" }).as('modules');
  });
  
  it('Should see the title', () => {
    cy.wait('@modules');
    cy.contains('Artikel');
  });

  it('Should see an article', () => {
    cy.wait('@modules');
    cy.contains('Testing is fun!');
  });

  it("Should rate an article", () => {
    cy.wait('@modules');

    cy.intercept('POST', '/api/modules/rate', (req) => {
        const newRating = req.body.positive ? [1, 1, 0] : [0, 0, 1];
        req.reply({ success: true, rating: { positive: req.body.positive }, newRating });
    }).as('rate');

    cy.get("i.fa.fa-thumbs-up").parent().click();
    cy.wait('@rate');
    cy.get("i.fa.fa-thumbs-up").parent().should("have.class", "btn-success");
  });
});
