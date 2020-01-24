/// <reference types="Cypress" />

describe("Journalist can log in", () => {
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
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/users/**",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/users/**",
      response: "fixture:login.json"
    });
    cy.visit("/");
    cy.get("#loginButton").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#login").within(() => {
      cy.get("a")
        .contains("Profile")
        .click();
    })
  });
});