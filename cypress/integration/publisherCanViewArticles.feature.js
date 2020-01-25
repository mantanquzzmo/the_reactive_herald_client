describe("Editor can", () => {
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
  });

  it("view unpublished articles", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login_publisher.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login_publisher.json"
    });

    cy.visit("/admin");
    cy.get("#loginButton").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("publisher@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });

    cy.get("#unpublished-articles").should("contain", "Title 1");
  });
});
