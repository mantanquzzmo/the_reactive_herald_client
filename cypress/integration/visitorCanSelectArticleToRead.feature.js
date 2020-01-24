describe("User is shown current article", () => {
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
      response: "fixture:article_show_change.json"
    });
  });

  it("successfully", () => {
    cy.visit("/");
    cy.get('#side-article-3').within(() => {
      cy.get('a').click()
    })
    cy.get("#main-article-div").should("contain", "Body 3");
  });

  
});
