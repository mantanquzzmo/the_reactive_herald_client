/// <reference types="Cypress" />

describe("Weather div displays", () => {
  it("weather info", () => {
    cy.visit("/");
    cy.get(".weatherMain").should("contain", 1.9);
    cy.get(".weatherMain").should("contain", "Kista");
    cy.get(".weatherMain").should("contain", "clouds");
  });
});