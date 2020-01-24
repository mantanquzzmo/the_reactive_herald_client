describe("Visitor can register", () => {
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

  it("successfully with valid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:signup.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:signup.json"
    });

    cy.visit("/");
    cy.get("#signupButton").click();
    cy.get("#signup").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Sign Up")
        .click();
    });
    cy.get("#login").should("contain", "Welcome! user@mail.com");
  });

  it("unsuccessfully with already taken credentials", () => {
    cy.route({
      method: "POST",
      url: "/api/v1/**",
      response: "fixture:user_already_exists.json",
      status : 422
    });

    cy.visit("/");
    cy.get("#signupButton").click();
    cy.get("#signup").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Sign Up")
        .click();
    })
    cy.get("#signup").should("contain", "User already exists");
  });
})