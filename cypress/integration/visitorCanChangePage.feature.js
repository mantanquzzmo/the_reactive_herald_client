describe("Visitor can change page and get more articles", () => {
  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles**",
      response: "fixture:side_articles_shown.json"
    });
    cy.visit("/");
    cy.get("#next-button").click()
    cy.get("#side-articles-1")
      .should("contain", "Test6");
  });
});
