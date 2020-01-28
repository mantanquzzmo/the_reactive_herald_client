describe('Registered user can purchase a subscription', () => {

  beforeEach(() => {
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
      response: "fixture:login_user.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login_user.json"
    });
    cy.visit('/')
    cy.get('#main-article-div').should('not.contain', 'Subscribe!')
    cy.get("#login-button").click();
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
    cy.wait(1000);

  });

  it('successfully', () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/subscriptions",
      response: {message: "paid"},
      status: 200
    });
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4242424242424242", { delay: 10 });
    });
    cy.get('iframe[name^="__privateStripeFrame6"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="exp-date"]')
        .type("1222");
    });
    cy.get('iframe[name^="__privateStripeFrame7"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cvc"]')
        .type("223");
    });
    cy.get('#payment > button').contains('Submit').click();
    cy.get("#message").should("contain", "Thank you for subscribing to The Reactive Herald!");
  });

  it('unsuccessfully', () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/subscriptions",
      response: {message: "fail"},
      status: 400
    });
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4142424242424242", { delay: 10 });
    });
    cy.get('iframe[name^="__privateStripeFrame6"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="exp-date"]')
        .type("1222");
    });
    cy.get('iframe[name^="__privateStripeFrame7"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cvc"]')
        .type("223");
    });
    cy.get('#payment > button').contains('Submit').click()
    cy.get("#message").should("contain", "Your card number is invalid.");
  });
});