describe('Login', () => {  
    it('Should visit the login page', () => {
      cy.visit('/login');
      cy.contains("Login");
    });

    it('Should see the register link', () => {
      cy.visit('/login');
      cy.contains("Registieren");
    });

    it('Should login', () => {
      cy.visit('/login');
      cy.get('input#username').type('test');
      cy.get('input#password').type('test');
      
      cy.intercept('POST', '/api/login', req => {
        it('Should have the correct request body', () => {
            expect(req.body).to.deep.equal({
                username: 'test',
                password: 'test'
            });
        });

        req.reply({
            success: true
        });
      }).as('login');

      cy.get('button').contains("Anmelden").click();

      cy.wait('@login');

      // check redirect
      cy.url().should('eq', 'http://localhost:4200/');
    });
});
