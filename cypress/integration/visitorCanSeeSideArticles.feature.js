describe("Visitor can see side articles", () => {
  beforeEach(() => {
    cy.server();
  });
  
  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json"
    });
    cy.visit("/");
    cy.get("#side-articles").children().should("have.length", "3");
  });

  it("unsuccessfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_empty.json"
    });
    cy.visit("/");
    cy.get("#error-message").should("contain", "No articles found");
  });
});
