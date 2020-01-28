/// <reference types="Cypress" />

describe("Profile page", () => {
  beforeEach(() => {
    cy.journalistLogin();
  });

  it("successfully shown with valid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/users/**",
      response: "fixture:profile_show.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/users/**",
      response: "fixture:profile_show.json"
    });
    cy.login();
    cy.get("#login").within(() => {
      cy.get("#profile-link")
        .contains("Profile")
        .click();
    });
    cy.get("#profile").should("contain", "user@mail.com");
  });
});
