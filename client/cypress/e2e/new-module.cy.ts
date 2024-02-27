import loggedIn from "../support/loggedIn";

describe('Should visit the quotes page', () => {
  beforeEach(() => {
    loggedIn(cy, "test");
    cy.visit('/modules/new');
  });
  
  it('Should see the title', () => {
    cy.get("h3").contains('Neue Modulbeschreibung');
  });

  it("Should create a module description", () => {
    const description = "Testing is Fun!";
    const module = "TEST";
    const slug = module + "-1";

    cy.intercept('POST', '/api/modules/new', (req) => {
        req.reply({ success: true, slug });
    }).as('create');

    cy.intercept('GET', '/api/modules/module/' + slug, { fixture: "module.json" }).as('module');

    cy.get("input#module").type(module);
    cy.get("textarea#desc").type(description);
    cy.get("button.btn-success").click();

    cy.wait(['@create', '@module']);
    cy.url().should('eq', 'http://localhost:4200/module/TEST-1');
  });
});
