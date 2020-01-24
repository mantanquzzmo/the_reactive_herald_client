/// <reference types="Cypress" />

describe("Footer displays", () => {
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
    cy.visit("/");
    cy.get("#footer").within(() => {
      cy.get("#profile-link")
        .contains("Profile")
        .click();
    })
    cy.get("#profile").should("contain", "user@mail.com");
  });
});
