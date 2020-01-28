describe("Page has multi-language support", () => {
  it("and viewer should see a english worded websie", () => {
    cy.visit("/");
    cy.get("#footer-info").should("contain", "CEO and Editor")
    cy.get(".ui.fluid.pointing.secondary.five.item.menu").should("contain", "Sports")
  });

  it("and viewer should see a swedish worded websie", () => {
    cy.visit("/");
    cy.get("#sv")
    .contains("Swedish")
    .click();
    cy.get("#footer-info").should("contain", "VD och chefredaktör")
    cy.get(".ui.fluid.pointing.secondary.five.item.menu").should("contain", "Sport")
  });

});
