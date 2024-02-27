import loggedIn from "../support/loggedIn";

describe('Should visit the home page', () => {
  beforeEach(() => {
    loggedIn(cy);
  });
  
  it('Should see the title trending', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/trending').as('trending');
    cy.wait('@trending');
    cy.contains('Trending')
  });

  it('Should see a trending quote', () => {
    cy.visit('/');
    
    const quote = "Testing is fun!";
    cy.intercept({
      path: '/api/trending',
      method: 'GET'
    }, {
      success: true,
      modules: [],
      articles: [],
      quotes: [{
        module: "test",
        slug: "test-1",
        description: quote,
        updated: new Date().toString(),
        author: "Anonymous",
        rating: [0.5, 0, 0],
        rated: null,
        comments: 0,
        _id: "__id"
      }]
    }).as('trending');

    cy.wait('@trending');
    cy.contains(quote);
  });
});
