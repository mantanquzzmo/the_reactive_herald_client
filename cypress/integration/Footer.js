/// <reference types="Cypress" />

describe("Footer displays", () => {
  it("an event from the past", () => {
    cy.visit("/");
    cy.get("#footer-onthisday").should(
      "contain",
      "Sri Lanka's Temple of the Tooth"
    );
  });

  it("todays financials", () => {
    cy.visit("/");
    cy.get("#footer-financials").should("contain", "Bitcoin: 8333 $");
  });

  it("newspaper info", () => {
    cy.visit("/");
    cy.get("#footer-info").should("contain", "CEO and Editor in chief:");
  });
});
