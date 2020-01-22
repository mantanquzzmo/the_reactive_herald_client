/// <reference types="Cypress" />

describe("Journalist attempts to create an article", () => {
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
      response: "fixture:login.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
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
  });

  it("successfully with title and body", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/admin/articles",
      response: {},
      status: 200
    });
    cy.get("#create-article").click();
    cy.get("#article-form").within(() => {
      cy.get("#title").type("This is a news article");
      cy.get("#body").type("Scourge of the seven seas rutters Pieces of Eight sutler spyglass swab strike colors" +
                            "gangway swing the lead bilged on her anchor.");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should("contain", "Your article was successfully submitted for review.");
  });

  it("unsuccessfully without title", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/admin/articles",
      status: "422",
      response: {
        errors: ["Your article must have a title and content."],
      }
    });
    cy.get("#create-article").click();
    cy.get("#article-form").within(() => {
      cy.get("#body").type("Scourge of the seven seas rutters Pieces of Eight sutler spyglass swab strike colors" +
                            "gangway swing the lead bilged on her anchor.");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should("contain", "Your article must have a title and content.");
  });

  it("unsuccessfully without body", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/admin/articles",
      status: "422",
      response: {
        errors: ["Your article must have a title and content."],
      }
    });
   cy.get("#create-article").click();
    cy.get("#article-form").within(() => {
      cy.get("#title").type("This is a news article");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should("contain", "Your article must have a title and content.");
  });
});

