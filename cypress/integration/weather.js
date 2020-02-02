/// <reference types="Cypress" />

describe("Weather div displays", () => {
  it("weather info", () => {
    cy.visit("/");
    cy.get(".weather-main")
      .should("contain", 1.9)
      .and("contain", "Kista")
  });
});