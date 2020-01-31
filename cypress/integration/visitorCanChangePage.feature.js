describe("Visitor can change page and another set of articles", () => {
  it("successfully goes to next page", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles*page=1",
      response: "fixture:side_articles_shown.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles*page=2",
      response: "fixture:side_articles_shown_page2.json"
    });
    cy.visit("/");
    cy.get("#next-button").click()
    cy.get("#side-article-6")
      .should("contain", "Test6");
  });
});
