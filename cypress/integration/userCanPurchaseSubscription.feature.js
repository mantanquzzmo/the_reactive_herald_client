describe('Registered User Can Purchase A SSubscription', () => {

  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:article_show.json"
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
  });

  it('', () => {
    cy.visit('/')
    cy.get('#main-article-div').should('not.contain', 'Subscribe!')
    cy.get("#loginButton").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get('#main-article-div').should('contain', 'Subscribe!')
    cy.get("button")
      .contains("Subscribe!")
      .click();
    cy.get('#main-article-div').should('contain', 'Form will go here')
  });
});