import loggedIn from "../support/loggedIn";

describe('Should visit the modules page', () => {
  beforeEach(() => {
    loggedIn(cy, "test");
    cy.intercept('GET', '/api/modules', { fixture: "modules.json" }).as('modules');
  });
  
  it('Should see the title', () => {
    cy.visit('/modules');
    cy.wait('@modules');
    cy.contains('Modulbeschreibungen');
  });

  it('Should see a module', () => {
    cy.visit('/modules');
    cy.wait('@modules');
    cy.contains('Test');
  });

  it('Should see if there are multiple descriptions for a module', () => {
    cy.visit('/modules');
    cy.wait('@modules');
    cy.get("button").contains("weitere Beschreibungen").click();
    cy.get("table").then(($table) => {
        $table.is(":visible");
        expect($table.find("tr").length).to.equal(2);
    });
  });

  it("Should rate a module", () => {
    cy.visit('/modules');
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
