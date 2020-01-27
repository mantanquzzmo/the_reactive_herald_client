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

  it("unsuccessfully with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.visit("/");
    cy.get("#login-button").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#login").should("contain", "Invalid login credentials. Please try again.");
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
    cy.visit("/");
    cy.get("#login-button").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#login").should("contain", "Logged in as: user@mail.com");
  });
});

describe("Journalist can log out", () => {
  it("successfully", () => {
    cy.server();
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/auth/sign_out",
      response: "fixture:login.json"
    });
    cy.get("#logout-link").click();
    cy.get("#login").contains("Login");
  });
});
